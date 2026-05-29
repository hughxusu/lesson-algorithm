# 其他链表

## 循环链表

单向链表的尾节点指向头节点（首尾相接），则得到一个环形链表。在环形链表中，任意节点都可以视作头节点。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/28-循环单链表.JPG" style="zoom:25%;" />

### 创建循环链表

循环链表中只有一个节点，尾指针指向自己。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/29-循环单链表-空表.jpg" style="zoom:15%;" />

```python
class SingleNode:
    def __init__(self, item=0):
        self.item = item
        self.next = None
        
class SingleCycleLinkList:
    def __init__(self, node=None):
        self.head = None
        if not self.is_empty():
            self.__add_first_node(node)

    def is_empty(self):
        return self.head is None

    def __add_first_node(self, node):
        self.head = node
        node.next = self.head
```

* `__add_first_node`私有方法，添加第一个节点。只要是空链表就可以调用该方法。

### 基本操作

```python
class SingleCycleLinkList:
    ...
    def length(self):
        if self.is_empty():
            return 0
            
        cur = self.head
        count = 1
        while cur.next != self.head:
            count += 1
            cur = cur.next
        return count

    def travel(self):
        if self.is_empty():
            return
        
        cur = self.head
        while cur.next != self.head:
            print(cur.item, end='\t')
            cur = cur.next
        print(cur.item, end='\t')
```

* `while cur.next != self.head:`训练链表的遍历结束方式，需要判断指针是否指向`head`。

### 插入节点

1. 头插节点

```python
class SingleCycleLinkList:
    ...
    def unshift(self, val):
        node = SingleNode(val)
        if self.is_empty():
            self.__add_first_node(node)
        else:
            node.next = self.head
            cur = self.head
            while cur.next != self.head:
                cur = cur.next
            cur.next = node
            self.head = node
```

* 节点插入后，需要调整位节点的指针指向头节点。

> [!warning]
>
> 循环链表操作时，需要注意调整尾节点的指向，保证尾节点指向头节点。

2. 尾插节点

```python
class SingleCycleLinkList:
    ...
    def append(self, val):
        node = SingleNode(val)
        if self.is_empty():
            self.__add_first_node(node)
        else:
            cur = self.head
            while cur.next != self.head:
                cur = cur.next
            cur.next = node
            node.next = self.head
```

3. 中间插入节点

```python
class SingleCycleLinkList:
    ...
    def insert(self, pos, val):
        if pos <= 0:
            self.unshift(val)
        elif pos >= self.length():
            self.append(val)
        else:
            node = SingleNode(val)
            cur = self.head
            for _ in range(pos - 1):
                cur = cur.next
            node.next = cur.next
            cur.next = node
```

### 节点查询和删除

1. 节点查询

```python
class SingleCycleLinkList:
    ...
    def search(self, val):
        if self.is_empty():
            return False
        
        cur = self.head
        while cur.next != self.head:
            if cur.item == val:
                return True
            cur = cur.next
        return False
```

2. 按索引删除
   * 删除的点是头节点
     * `self.head.next == self.head`表示只有一个节点，直接将`head`设置为`None`。
     * 如果不是只有一个节点：
       1. 找到原有尾节点。
       2. 删除头节点，`head`指向新的头节点。
       3. 尾节点执行新的头节点。
   * 删除节点不是头节点，与一般单链表删除相同。

```python
class SingleCycleLinkList:
    ...
    def remove_index(self, pos):
        if pos < 0 or pos >= self.length():
            return
        
        if pos == 0:
            if self.head.next == self.head:
                self.head = None
                return
            
            tail = self.head
            while tail.next != self.head:
                tail = tail.next
            
            self.head = self.head.next
            tail.next = self.head
            return
        
        cur = self.head
        for _ in range(pos - 1):
            cur = cur.next

        cur.next = cur.next.next
```

3. 按值删除，相同的值全部删除。
   1. 找到尾节点，将链表断开变为单链表。
   2. 增加虚拟头节点，按单链表方法进行删除。
   3. 删除后将尾节点指向头节点。

```python
class SingleCycleLinkList:
    ...
    def remove_val(self, val):
        if self.is_empty():
            return

        tail = self.head
        while tail.next != self.head:
            tail = tail.next

        tail.next = None
        dummy = SingleNode(0)
        dummy.next = self.head
        cur = dummy

        while cur.next != None:
            if cur.next.item == val:
                cur.next = cur.next.next
            else:
                cur = cur.next

            if cur.next == None:
                tail = cur
        
        self.head = dummy.next
        if self.head:
            tail.next = self.head
```

> [!think]
>
> 使用逻辑判断，重构上面代码，应该如何写？

## 双链表

双向链表的节点定义同时包含指向后继节点（下一个节点）和前驱节点（上一个节点）的引用（指针）。双向链表可以朝两个方向遍历链表，但相应地也需要占用更多的内存空间。

双链表节点

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/23-双链表结点.jpg" style="zoom: 25%;" />

```python
class Node:
    def __init__(self, val=0):
        self.val = val
        self.next = None
        self.prev = None
```

双链表

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/22-单链表与双链表.JPG" style="zoom:25%;" />

### 双链表的实现

实现一个复杂的双链表

* 增加链表长度和尾部指针变量。
* 通过记录链表中额外的信息，优化链表操作的时间复杂度。

```python
class DoubleLinkList:
    def __init__(self, node=None):
        self.head = node
        self.tail = node
        self.length = 0
        if node is not None:
            self.length += 1
```

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/ukk8punw7s.jpeg" style="zoom:80%;" />

1. 前端增加节点

```python
class DoubleLinkList:
    ...
    def unshift(self, value):
        node = Node(value)
        if self.length == 0:
            self.head = node
            self.tail = node
        else:
            node.next = self.head
            self.head.prev = node
            self.head = node
        self.length += 1
```

2. 后端添加节点

```python
class DoubleLinkList:
    ...
    def append(self, value):
        node = Node(value)
        if self.length == 0:
            self.head = node
            self.tail = node
        else:
            self.tail.next = node
            node.prev = self.tail
            self.tail = node
        self.length += 1
```

3. 插入节点

```python
class DoubleLinkList:
    ...
    def insert(self, index, value):
        if index <= 0:
            self.unshift(value)
        elif index >= self.length:
            self.append(value)
        else:
            node = Node(value)
            cur = self.head
            for _ in range(index - 1):
                cur = cur.next
            node.next = cur.next
            cur.next.prev = node
            cur.next = node
            self.length += 1
```

4. 搜索节点

```python
class DoubleLinkList:
    ...
    def search(self, value):
        cur = self.head
        while cur is not None:
            if cur.item == value:
                return True
            cur = cur.next
        return False
```

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/27-双链表删除.JPG" style="zoom:25%;" />

5. 按值删除

```python
class DoubleLinkList:
    ...
    def remove_value(self, value):
        dummy_head = Node(0)
        dummy_head.next = self.head
        dummy_tail = Node(0)
        dummy_tail.prev = self.tail
        cur = dummy_head
        while cur.next is not None:
            if cur.next.item == value:
                cur.next = cur.next.next
                if cur.next is not None:
                    cur.next.prev = cur
                else:
                    self.tail = cur
                self.length -= 1
            else:
                cur = cur.next

        if self.length == 0:
            self.head = None
            self.tail = None
        else:
            self.head = dummy_head.next
            self.head.prev = None
            self.tail = dummy_tail.prev
            self.tail.next = None
```

6. 按位置删除

```python
class DoubleLinkList:
    ...
    def remove_index(self, index):
        if index <= 0:
            self.head = self.head.next
            if self.head is not None:
                self.head.prev = None
            else:
                self.tail = None
            self.length -= 1
            return
        
        if index >= self.length:
            self.tail = self.tail.prev
            self.tail.next = None
            self.length -= 1
            return

        cur = self.head
        for _ in range(index - 1):
            cur = cur.next
        cur.next = cur.next.next
        if cur.next is not None:
            cur.next.prev = cur
        else:
            self.tail = cur
        self.length -= 1
```

> [!tip]
>
> 1. 简单双向链表的实现。
> 2. 双向循环链表的实现。

## 相关问题

**[21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/)**

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/21-2.png" style="zoom:60%;" />

* 将列表节点较小的值结在`dummy`后，然后移动列表头。直到`list1`和`list2`都为空。
* `dummy`最开始为`cur`，当有节点接入后，`cur`后移。

```python
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode()
        cur = dummy
        while list1 and list2:
            if list1.val < list2.val:
                cur.next = list1
                list1 = list1.next
            else:
                cur.next = list2
                list2 = list2.next
            cur = cur.next
        cur.next = list1 or list2
        return dummy.next
```

## 练习

| 题目名称                                                     |
| ------------------------------------------------------------ |
| [147. 对链表进行插入排序](https://leetcode.cn/problems/insertion-sort-list/) |
| [148. 排序链表](https://leetcode.cn/problems/sort-list/)     |
| [61. 旋转链表](https://leetcode.cn/problems/rotate-list/)    |
| [143. 重排链表](https://leetcode.cn/problems/reorder-list/)  |
| [234. 回文链表](https://leetcode.cn/problems/palindrome-linked-list/) |
