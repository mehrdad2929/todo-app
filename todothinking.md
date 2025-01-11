i need task and project object for 2 things and 2 things only in this app
1. saveing data in local storage and retriving them in localstorage
2. sorting them by some key like deadline or status 

for now i try to complete the single tasks table and everything related to it 
from saving and retriving date from local storage to etc so lets break down etc

# desired outcome:
## showing tasks(table)
i start a table element and create its headings then
i get the data from local storage and check for the value with key "singletasks"
then i get the list and go through them(iteratig) and create rows 
###### later probably i will do somthing for sorting data 
#### todo:
        1. show table 
for the first time when u click on single tasks option from sidebar
you get a table in the main content which has headings and 
## add new task btn
a option to add new content at the last row(which should be the only row at first time)
for now i can use a single key at the start of main-content page that say add new task 
and by pressing that a forom opens and it gets data from user and (calls local storage for singletask key 
and gets the singletask key value which is an array consisting of task objects and pushes the new object which is created 
via new data from the forum , then after pressing a the submit btn 
we sent the key(singletasks)/value(the list) to local storage 
#### todo:
      1.implement the add new task btn
      2.create the forum 
      3.and store the data

