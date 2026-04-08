*** Settings ***
Documentation     A basic Robot Framework test suite
Library           Collections
Library           String

*** Variables ***
${BROWSER}        chrome
${URL}            https://example.com

*** Test Cases ***
Example Test Case
    [Documentation]    This is a simple test case
    Log    Hello from Robot Framework
    Should Be Equal    ${1}    ${1}

Another Test Case
    [Documentation]    Another example test
    Log Many    arg1    arg2    arg3
    Should Contain    ${URL}    example

*** Keywords ***
Custom Keyword
    [Documentation]    A reusable keyword
    [Arguments]    ${arg}
    Log    Argument is: ${arg}
