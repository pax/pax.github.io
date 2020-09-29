import requests, sys

# outfile = 'data/defs.csv'
# input_file = sys.argv[1]
outfile = sys.argv[1]
if not outfile:
    print ('syntax: python fetch-sheet.py <path/tp/output.csv>')
response = requests.get(
    
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT0afXRM0GhnJ0lXBBd7FV8HH4zFlGLA00UQ5RGLja9Q1rCJMr6vvwlaR0V9HoFf4dlno2lN4e9PRhS/pub?gid=733924848&single=true&output=csv'
)
assert response.status_code == 200, 'Wrong status code'
# print(type(response.content))
# csv = str(response.content)
f = open(outfile, 'wb')
f.write(response.content)
f.close()
print('yankey doodle. \nDONE')
# print(response.content)