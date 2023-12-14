#!/usr/bin/env bash

# 쉬고 있는 profile 찾기
function find_idle_profile() {
    RESPONSE_CODE = $(curl -s -o /dev/null -w "%{http_code}" http://localhost/profile)

    if [ ${RESPONSE_CODE} -ge 400 ]
    then
        CURRENT_PROFILE = server1
    else
        CURRENT_PROFILE = $(curl -s http://localhost/profile)
    fi

    if [ ${CURRENT_PROFILE} == server2 ]
    then
        IDEL_PROFILE = server2
    else
        IDLE_PROFILE = server1
    fi

    echo "${ IDLE_PROFILE }"
}

# 쉬고 있는 profile의 port 찾기
function find_idle_port() {
    IDLE_PROFILE = $(find_idle_profile)

    if [ ${IDLE_PROFILE} == server1 ]
    then
        echo "8081"
    else
        echo "8082"
    fi
}