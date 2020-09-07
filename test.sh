#@Author: lize  2020/04/27
#！ /bin/bash
echo "程序开始**********************************************************************************"

# 打印当前路径
currentPath=$(pwd)
echo "当前文件夹路径: $currentPath"

#要去往的分支名称---变量
targetBranchName=""
#需要合并的分支集合---变量
parems2=""
# git commit 时,需要填写的备注信息---变量
commitMessage=""

#解析参数方法
while [ $# -gt 0 ];
    do
      case $1 in
        -t)
          echo "参数解析完毕 -t----$2"
          targetBranchName=$2
          shift
          ;;
        -f)
          echo "参数解析完毕 -f----$2"
          parems2=$2
          #要将$parems2分割开，先存储旧的分隔符
          OLD_IFS="$IFS"
          #设置分隔符
          IFS=","
          branchAry=($parems2)
          #恢复原来的分隔符
          IFS="$OLD_IFS"
          #判断是否有输入需要合并的分支列表，没有的话采用默认的分支列表
          if [ ${#branchAry[@]} -eq 0 ]
            then
              branchAry=("dev_lz" "dev_lxx" "dev_ww" "dev_dcx" "dev_libf" "dev_jjc" "dev_lh" "dev_lsh")
          fi
          shift
           ;;
        -m)
          echo "参数解析完毕 -m----$2"
            commitMessage=$2
            if [ ! "$commitMessage" ]
              then
                commitMessage="feat 程序自动提交本分支文件"
            fi
          shift
          ;;
        -h | --help)
          echo '
              -a   要去往的分支名称 例如 dev
              -b   需要合并的分支集合 sting类型  已逗号拼接  例如 "dev_1,dev_2,dev_3...."
              -m   git commit 时,需要填写的备注信息 sting类型   默认  "feat 程序自动提交本分支文件"
          '
          shift
          ;;
      esac
      shift
    done


#检测是否在目标的分支，不在的话切换至目标分支
JudgeBranchName(){
  now_branch_name=`git branch | awk  '$1 == "*"{print $2}'`
  echo "当前分支为 ${now_branch_name} *****"
  echo ":q\r"|git pull origin ${now_branch_name}
#  Changes=$(git status 2>&1 | grep -e 'Changes')
#  if [ "$Changes" ]
#    then
#      echo '有文件未提交'
      echo '自动提交一次文件 *****'
      git add .
      git commit -m "${commitMessage}"
      git push origin $now_branch_name
#  fi
  if [ $now_branch_name != $targetBranchName ]
    then
      echo "当前分支和目标分支不一致，将切换至 ${targetBranchName}分支 *****"
      git checkout ${targetBranchName}
      copy_now_branch_name=`git branch | awk  '$1 == "*"{print $2}'`
      echo "分支切换成功 已切换至 ${copy_now_branch_name} 分支 *****"
  fi
  echo ":q\r"|git pull origin $targetBranchName
}
#执行的命令
ActionModule(){
  echo ":q\r"|git pull origin $1
  merageLog=$(git diff --check 2>&1)
  if [ "$merageLog" ]
    then
      exit
  fi
  echo "拉取完毕，开始提交*****"
  git add .
  git commit -m "feat:自动合并 $1 分支"
  git push origin ${targetBranchName}
  echo "提交完毕*****"
}
#统计要合并的分支名称，循环操作
MergeCode(){
  JudgeBranchName
  if [ ${#branchAry[@]} -eq 0 ]
    then
      echo "未获取到要合并的分支列表*****"
      exit
  fi
  for  ((i=0; i<${#branchAry[@]}; i ++))
    do
      JudgeExist ${branchAry[i]}
      if [ $? -eq 0 ]
        then
          echo "没有找到 ${branchAry[i]} 分支,将跳过此分支*****"
        else
           echo "即将拉取 ${branchAry[i]} 分支代码*****"
          ActionModule ${branchAry[i]}
      fi
    done
  echo "全部分支已更新、并提交。将切换回原分支 ${now_branch_name}*****"
  git checkout $now_branch_name
  echo "以切换回原本分支 ${now_branch_name}*****"
  echo "程序结束**********************************************************************************"
}
#检车输入分支名称是否存在
JudgeExist(){
  all_branchs=`git branch -a`;
#  start=0
  exist=0
  for branch in $all_branchs;
  do
    branch_simple_name=`echo $branch | grep '/' | cut -d '/' -f3`
    if [[ "$branch_simple_name" != "" && "$branch_simple_name" != "HEAD" && "$branch_simple_name" != "master" ]]
    then
      #      all_branchsimple_names[$start]=$branch_simple_name
      #      start=`expr $start + 1`
      if [ "$branch_simple_name" == "$1" ]
      then
          exist=1
          break
      fi
    fi
  done
  return $exist
#  echo "${all_branchsimple_names[@]} asdasdasdas"
}
#主函数
Main(){
   echo $targetBranchName
  if [ ! $targetBranchName ]
  then
    echo "没接收到目标分支名称******"
    exit
  fi
  JudgeExist $targetBranchName
  if [ $? -eq 0 ]
  then
    echo '没匹配到目标分支名称*****'
    exit
  fi
  MergeCode
}
Main
