

students = [
    {'id': '2024001', 'name': '张三', 'major': '计算机'},
    {'id': '2024002', 'name': '李四', 'major': '数学'},
    {'id': '2024003', 'name': '王五', 'major': '物理'},
]

for student in students:
    if student['id'] == '2024003':
        print(student)



students = {
    '2024001': {'name': '张三', 'major': '计算机'},
    '2024002': {'name': '李四', 'major': '数学'},
    '2024003': {'name': '王五', 'major': '物理'}
}


print(students['2024003'])
