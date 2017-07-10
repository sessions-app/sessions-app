#/bin/bash

n=0
until [ $n -ge 5 ]
do
   yarn run migrate && break
   n=$(($n+1))
   sleep 2
done

if [ $n -eq 5 ]; then
  exit 1
fi

if [ "$NODE_ENV" = "production" ]; then
  yarn start
else
  yarn run dev
fi
