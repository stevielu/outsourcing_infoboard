import os

name_group = os.listdir('.')
index1 = name_group.index('batch.py')
name_group.pop(index1)
index2 = name_group.index('index.ts')
name_group.pop(index2)




for name in name_group:
    file_name = name.split('.')
    str = "import {} from './{}'".format(file_name[0],name)
    print(str)

for name in name_group:
    file_name = name.split('.')
    str = "'{}':{},".format(file_name[0],file_name[0])
    print(str)
