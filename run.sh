#!/usr/bin/env bash
export SPRING_PROFILES_ACTIVE=dev

if [ "$1" == "debug" ]; then
    echo "Starting in remote debugging mode..."
    # https://docs.spring.io/spring-boot/maven-plugin/run.html#run.examples.debug
    mvnd spring-boot:run -Dspring-boot.run.jvmArguments='-agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=*:5005'
else
    echo "Starting in standard development mode..."
    mvnd spring-boot:run
fi
