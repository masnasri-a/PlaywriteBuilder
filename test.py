import itertools
param_data = {"forBusinessUserId":"36","searchQuery":"Unilever","status":["AWAIT","COMPLETE"]}
temp_list = []
list_key = param_data.keys()
for detail in param_data:
    key = param_data[detail]
    if type(key) == list:
        temp_again = []
        for x in key:
            if type(x) == int:
                temp_again.append(f'int_{detail}_{str(x)}')
            else:
                temp_again.append(f'{detail}_{x}')
        temp_list.append(temp_again)
print(temp_list)
iter = list(itertools.product(*temp_list))
new_list_param_data = []
for detail in iter:
    list_iter = list(detail)
    temp_param_data = param_data.copy()
    for detail_iter in list_iter:
        for detail_list_key in list_key:
            if detail_list_key in detail_iter:
                str_param_data:str = detail_iter
                string_parser = str_param_data.replace(detail_list_key+"_","")
                if 'int_' in string_parser:
                    temp_param_data[detail_list_key] = int(string_parser.replace("int_",""))
                else:
                    temp_param_data[detail_list_key] = string_parser
                
    # print(type(detail))
    new_list_param_data.append(temp_param_data)
    print(temp_param_data)
    print("==========")
print(new_list_param_data)