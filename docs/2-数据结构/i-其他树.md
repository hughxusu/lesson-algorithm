# 其他二叉树

## 二叉搜索树

二叉搜索树（Binary Search Tree，BST），也称排序二叉树：

1. 左子树中所有节点的值<根节点的值<右子树中所有节点的值。
2. 任意节点的左、右子树也是二叉搜索树，即同样满足条件 `1.`。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/Xnip2026-02-26_23-33-57.jpg" style="zoom:55%;" />

> [!warning]
>
> 严谨的理论定义，不允许二叉搜索树有相同值；但在实际工程应用中，可以有。

定义二叉搜索树与一般二叉树一致，也是从根节点开始

```python
class BinarySearchTree:
    def __init__(self):
        self.root = None
```

### 添加节点

1. 查找插入位置：从根节点开始，将要插入`target`与当前节点值进行比较：
   * 如果树为空：将新节点直接作为根节点。
   * 如果`target`<当前节点值：转到当前节点的左子树继续比较。
   * 如果`target`>当前节点值：转到当前节点的右子树继续比较。
   * 如果`target`==当前节点值，不允许再插入当前值。
2. 执行插入：重复上述查找过程，直到遇到空指针`NULL`，即找到了新节点的正确位置。将新节点插入到该空指针位置即可。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/bst_insert.png" style="zoom:65%;" />

```python
class BinarySearchTree:
		...
    def add(self, val):
        if self.root is None:
            self.root = TreeNode(val)
            return
        cur, pre = self.root, None
        while cur is not None:
            if cur.val == val:
                return

            pre = cur
            if cur.val > val:
                cur = cur.left
            else:
                cur = cur.right

        node = TreeNode(val)
        if pre.val > val:
            pre.left = node
        else:
            pre.right = node
```

* 借助节点`pre`保存上一轮循环的节点。这样在遍历至`None`时，可以获取到父节点，从而完成节点插入操作。

### 删除节点

二叉搜索树的删除操作，必须保证剩下的节点，依然满足二叉搜索树的特性。根据要删除的`target`，分为三种场景：

1. 删除叶子节点：直接将该节点的父节点指向它的指针置为`NULL`。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/bst_remove_case1.png" style="zoom:65%;" />

2. 删除只有一个子节点的节点：将子节点的值复制到父节点，然后删除子节点。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/bst_remove_case2.png" style="zoom:65%;" />

3. 删除有两个子节点的节点
   1. 找到目标节点的右子树中的最小节点（称为后继节点）。
   2. 将后继节点的值复制到目标节点中。
   3. 删除那个后继节点（此时后继节点情况适用于1或2）。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/Xnip2026-03-02_15-48-16.jpg" style="zoom:37%;" />

```python
class BinarySearchTree:
    ...
    def remove(self, val):
        if self.root is None:
            return

        cur, pre = self.root, None
        while cur is not None:
            if cur.val == val:
                break

            pre = cur
            if cur.val > val:
                cur = cur.left
            else:
                cur = cur.right

        if cur is None:
            return

        if cur.left is None or cur.right is None:
            child = cur.left or cur.right
            if cur != self.root:
                if pre.left == cur:
                    pre.left = child
                else:
                    pre.right = child
            else:
                self.root = child
        else:
          	# 1. 寻找右子树的最小节点（后继节点）
            tmp = cur.right
            while tmp.left is not None:
                tmp = tmp.left
                
            # 2. 将后继节点的值复制给当前节点
            cur.val = tmp.val
            
            # 3. 递归调用 remove 方法删除 tmp 节点
            self.remove(tmp.val)
```

### 顺序打印

二叉树的中序遍历遵循“左$\rightarrow$根$\rightarrow$右”的遍历顺序，而二叉搜索树满足“左子节点<根节点<右子节点”的大小关系。所以中序遍历就是顺序打印。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/bst_inorder_traversal.png" style="zoom:65%;" />

```python
class BinarySearchTree:
    ...
    def travel(self):
        def _travel(root):
            if root is not None:
                _travel(root.left)
                print(root.val, end=" " * 2)
                _travel(root.right)
        _travel(self.root)
        print()
```

## 相关问题

**[257. 二叉树的所有路径](https://leetcode.cn/problems/binary-tree-paths/)**

* 利用递归函数的返回值。
* 递归表达式：将当前节点拼接到左右子树所有的路径上。
* 终止条件：到叶子节点终止。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/develop/images/parctice/traversal_complete.png" style="zoom:90%;" />

```python
class Solution:
    def binaryTreePaths(self, root: Optional[TreeNode]) -> List[str]:
        if not root:
            return []
        if not root.left and not root.right:
            return [str(root.val)]
        left = self.binaryTreePaths(root.left)
        right = self.binaryTreePaths(root.right)
        all = left + right
        result = [str(root.val) + '->' + path for path in all]
        return result
```

**[437. 路径总和 III](https://leetcode.cn/problems/path-sum-iii/)**

1. 包含当前节点，路径上的点和值为`sum`。
2. 不包含当前节点，路径上的点和值为`sum`。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/develop/images/parctice/feb80061d0aeeeb609691db56d5e6baf.png" style="zoom:80%;" />

```python
class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        if not root:
            return 0
        
        count = self.subPathSum(root, targetSum)
        count += self.pathSum(root.left, targetSum)
        count += self.pathSum(root.right, targetSum)
        return count

    def subPathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        if not root:
            return 0

        count = 0
        if root.val == targetSum:
            count += 1
        
        count += self.subPathSum(root.left, targetSum - root.val)
        count += self.subPathSum(root.right, targetSum - root.val)
        return count
        
```

**[235. 二叉搜索树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/)**

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/develop/images/parctice/search-tree.jpg" style="zoom: 45%;" />

1. 对于任意节点`root`，`p`和`q`都小于或大于公共祖先，则在左子树或右子树搜索（情况三、情况四）。
2. 对于任意节点`root`，`p`和`q`一个小于`root`一个大于`root`，最近公共祖先是`root`（情况二）。
3. 对于任意节点`root == q`，`p`小于或大于`root`，最近最近公共祖先是`root == q`（情况一）。

```python
class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        if not root:
            return None

        if p.val < root.val and q.val < root.val:
            return self.lowestCommonAncestor(root.left, p, q)
        
        if p.val > root.val and q.val > root.val:
            return self.lowestCommonAncestor(root.right, p, q)
        
        return root
```

## 练习

| 题目名称                                                     |
| ------------------------------------------------------------ |
| [113. 路径总和 II](https://leetcode.cn/problems/path-sum-ii/) |
| [129. 求根节点到叶节点数字之和](https://leetcode.cn/problems/sum-root-to-leaf-numbers/) |
| [98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/) |
| [450. 删除二叉搜索树中的节点](https://leetcode.cn/problems/delete-node-in-a-bst/) |
| [108. 将有序数组转换为二叉搜索树](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/) |
| [230. 二叉搜索树中第 K 小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/) |
| [236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/) |