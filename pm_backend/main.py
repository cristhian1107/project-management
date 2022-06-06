import mysql.connector

from pm_backend.database.db_user import DBUser

mydb = mysql.connector.connect(
                                user='root',
                                password='r00t',
                                host='localhost',
                                database='project_management'
                              )

mycursor = mydb.cursor(dictionary=True)
mycursor.execute("SELECT * FROM companies")
myresult = mycursor.fetchall()
print (myresult)

mydb.close()

