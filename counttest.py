import pyttsx3
import concurrent.futures
import sys
import os
from time import sleep
from random import random, randrange

DIFFICULTY = {
    "hard": 1.0,
    "medium": 2.5,
    "easy": 5.0
    }


random_number_list = []
for n in range(int(sys.argv[1])):
    random_number_list.append(randrange(1,10))

print(random_number_list)

f = open("facit.txt", "w")
f.write(f'RANDOM NUMBER LIST: {random_number_list}\n')
index = 1
while random_number_list:
    a = random_number_list.pop(0)
    os.system(f'say {str(a)}') 
    sleep(DIFFICULTY[sys.argv[2]])
    if not random_number_list:
        break
    b = random_number_list[0]
    sum = a + b
    counter = 0

    f.write(f'{index}. ({a}+{b}) = {sum}\n')
    index+=1

f.close()