#!/bin/sh
if [ $1 == "Qa" ] 
then
    echo "The Selected Environment is: $1"
    npm run distributeQa
elif [ $1 == "Prod" ]
then
    echo "The Selected Environment is: $1"
    npm run distributeProd
else
    echo "The Selected Environment is: $1"
    npm run distributeDev
fi
