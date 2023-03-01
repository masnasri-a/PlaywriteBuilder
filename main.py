import re, json

def TittleToText(text:str):
    result = re.sub(r'(?<=\w)([A-Z])', r' \1', text)  
    return result.lower()

def createTestCase(data:dict):
    length = len(data)
    pass

if __name__ == "__main__":
    # endpoint:str = input('enter enpoint url : ')
    endpoint:str = 'https://partner-api.estidar-dev.com/businessUser/createBusinessUser'
    splitter = endpoint.split("/")
    describe_name = TittleToText(splitter[-2])
    test_name = TittleToText(splitter[-1])
    print(describe_name)
    print(test_name)
    # expectTrue = input('input expected if true : ')
    expectTrue:str = json.dumps({"businessUserId":0,"businessPartnerId":0,"name":"Tokopedia","email":"tokopedia@tokopedia.com","phoneNumber":"62854555931"})
    json_data = json.loads(expectTrue)
    listExpectTrue = list(json_data.keys())
    print(listExpectTrue)
    
    """Create Test Case"""
    param_type = input("parameter type json? [y/n] : ")
    if param_type.lower() == 'y':
        param_type = "body"
    elif param_type.lower() == 'n':
        param_type = "param"
    # param = input('input paramerter as dictionary : ')
    param:str = json.dumps({"name":"Unilever","email":"unilever@unilever.com","phoneNumber":"62854555936"})
    param_json = json.loads(param)
    print(param_json)
    createTestCase(param_json)
    
    