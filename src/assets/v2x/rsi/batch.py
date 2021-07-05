import os

name_group = os.listdir('.')
index1 = name_group.index('batch.py')
name_group.pop(index1)
index2 = name_group.index('index.ts')
name_group.pop(index2)
index3 = name_group.index('.DS_Store')
name_group.pop(index3)

name_group.sort(key = lambda x: int(x[:-4]))

for name in name_group:
    file_name = name.split('.')
    str = "import rsi_svg_{} from './{}'".format(file_name[0],name)
    print(str)

for name in name_group:
    file_name = name.split('.')
    str = "rsi_svg_{},".format(file_name[0])
    print(str)
