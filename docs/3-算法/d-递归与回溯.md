# 回溯与递归

回溯 (Backtracking)：在解决问题时，尝试一条路，如果发现走不通（不满足约束条件），就退回到上一个状态，换另一条路试试。它的核心思想是从一个初始状态出发，暴力搜索所有可能的解决方案。

回溯算法的特点：

* 回溯是一种通过穷举来解决问题的方法。
* 回溯算法通常采用“深度优先搜索”来遍历解空间，是深度优先搜索的一种应用。
* 回溯法通常通过递归来实现。
  * 递归负责探索更深的路径。
  * 回溯可以退回父节点，继续探索其他的子路径。
* 部分回溯的过程可以剪枝以提升算法效率。

## 递归与回溯的差别

* 递归的目的是到达每一个已经存在的节，即遍历节点。
* 回溯的目的是寻找符合条件的路径。

### 状态的独占与释放

**[46. 全排列](https://leetcode.cn/problems/permutations/)**

选择1作为首位，剩下只能选择2和3。其他情况类似。

![](https://raw.githubusercontent.com/hughxusu/lesson-algorithm/develop/images/parctice/leetcode-46-1.png)
$$
P(S)=\left \{s_i  \right \}+P(S-s_i)\quad s_i\in S
$$

```python
class Solution:
    def __init__(self):
        self.result = []

    def backtrack(self, path, options):
        if not options:
            self.result.append(path)
            return
        for i, num in enumerate(options):
            self.backtrack(path + [num], options[:i] + options[i+1:])

    def permute(self, nums: List[int]) -> List[List[int]]:
        self.backtrack([], nums)
        return self.result
```

* `path`表示当前的排列结果，`options`表示剩下没有用的数字。
* `for i, num in enumerate(options)`
  * 选出一个数组拼接在`path`排列结果上。
  * 调整`options`得到剩下的数字。

  比较递归与回溯

  <img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/Xnip2026-03-15_22-08-52.jpg" style="zoom:65%;" />

  深度优先遍历：

* 在二叉树遍历中，当访问左子树，右子树依然在那里，互不干扰。

全排列问题：

* 第一位选择 `1`，那么在这一条分支的后续选择中，`1`就被独占了，剩下的只能选`2`或`3`。
* 回溯的过程：当完成了一次排列，比如选择`1, 2, 3`，必须回到上一层，重新选择。
* 回溯的意义：撤销当前的选择，恢复到上一层选择的状态，重新选择。
* 当没有可选项时记录所选的结果。

> [!note]
>
> 状态的重置，是回溯算法的核心思想：回溯 = 递归 + 状态重置。

### 选择与试错

**[79. 单词搜索](https://leetcode.cn/problems/word-search/)**

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/develop/images/parctice/leetcode-79.jpg" style="zoom: 25%;" />

1. 定义搜索的匹配顺序为上、右、下、左，顺时针方向。
2. 首先搜索上面位置，
   1. 匹配后，在下一个位置安装`1.`的顺序继续寻找。
   2. 不匹配，搜索右边，以此类推。
3. 重复上面过程，指导所以字符完全匹配。

```python
class Solution:
    def __init__(self):
        self.cols = 0
        self.rows = 0
        self.word = ''
        self.board = []
        self.directions = [(-1, 0), (0, 1), (1, 0), (0, -1)]

    def is_in_board(self, i, j):
        return 0 <= i < self.rows and 0 <= j < self.cols

    def backtrack(self, i, j, k):
        if k == len(self.word):
            return True
        if not self.is_in_board(i, j) or self.board[i][j] != self.word[k]:
            return False
        temp = self.board[i][j]
        self.board[i][j] = ''
        for di, dj in self.directions:
            if self.backtrack(i + di, j + dj, k + 1):
                return True
        self.board[i][j] = temp
        return False

    def exist(self, board: List[List[str]], word: str) -> bool:
        self.word = word
        self.board = board
        self.rows = len(board)
        self.cols = len(board[0])

        for i in range(self.rows):
            for j in range(self.cols):  
                if self.backtrack(i, j, 0):
                    return True
        return False
```

* `board[i][j] = ''`当匹配成功后将，将字符设置为`''`避免再次被搜索，搜索回溯后将值复原`board[i][j] = temp`。

算法的目标是找到一个正确的路径

* 尽可能深入的探索路径，如果路径探索失败，需要退回上一个位置。
* 重置探索状态。
* 选择新的路径继续探索。

存在满足条件的路径成功，否则失败。

## 回溯的应用

剪枝：复杂的回溯问题通常包含一个或多个约束条件，剪枝去掉了不满足约束条件的搜索分支，避免许多无意义的尝试，从而提高了搜索效率。

**[77. 组合](https://leetcode.cn/problems/combinations/)**

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/1821153-20200908103721290-570793460.png" style="zoom: 50%;" />

```python
class Solution:
    def __init__(self):
        self.result = []
        self.k = 0
        self.n = 0
        self.nums = []

    def backtrack(self, path, start):
        if len(path) == self.k:
            self.result.append(path)
            return
        for i in range(start, self.n - self.k + len(path) + 1):  
            self.backtrack(path + [self.nums[i]], i + 1)   

    def combine(self, n: int, k: int) -> List[List[int]]:
        self.k = k
        self.n = n
        self.nums = [i for i in range(1, n+1)]
        self.backtrack([], 0)
        return self.result
```

* `i`的结尾位置为`n-k+len(path)`，`range`的结尾位置为`n-k+len(path)+1`。


**[200. 岛屿数量](https://leetcode.cn/problems/number-of-islands/)**

Floodfill算法

* 从初始点的上、右、下、左，顺时针方向遍历。
* 使用深度优先遍历。
* 重复上面的过程，直到所有的陆地全都标记过。

  <img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/develop/images/parctice/format-webp.png" style="zoom:65%;" />

> [!warning]
>
> Floodfill算法的本质是深度优先的遍历。

```python
class Solution:
    def __init__(self):
        self.count = 0
        self.rows = 0
        self.cols = 0
        self.grid = None
        self.directions = [(-1, 0), (0, 1), (1, 0), (0, -1)]

    def is_in_grid(self, i: int, j: int) -> bool:
        return 0 <= i < self.rows and 0 <= j < self.cols

    def dfs(self, i: int, j: int):
        if not self.is_in_grid(i, j) or self.grid[i][j] == '0':
            return
        self.grid[i][j] = '0'
        for dx, dy in self.directions:
            self.dfs(i + dx, j + dy)    

    def numIslands(self, grid: List[List[str]]) -> int:
        self.grid = grid
        self.rows = len(grid)
        self.cols = len(grid[0]) if grid else 0

        if not self.grid:
            return 0
        
        for i in range(self.rows):
            for j in range(self.cols):  
                if self.grid[i][j] == '1':
                    self.count += 1
                    self.dfs(i, j)
        return self.count
```

* `self.grid[i][j] = '0'`访问过的位置设置为0，但没有重置过程，只需要统计岛屿数量即可。


**[51. N 皇后](https://leetcode.cn/problems/n-queens/)**

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/n_queens_constraints.png" style="zoom:65%;" />

1. 棋盘每行都允许且只允许放置一个皇后。
2. 从第一行开始，在每行放置一个皇后，直至最后一行结束。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/n_queens_placing.png" style="zoom:65%;" />

对角线判断：

* 主对角线上所有格子的$row-col$为恒定值。
* 次对角线上所有格子的$row+col$是恒定值。

```python
class Solution:
    def __init__(self):
        self.result = []
        self.n = 0

    def is_valid(self, row, col, cols, diag, anti_diag):
        not_in_cols = col not in cols
        not_in_diag = row - col not in diag
        not_in_anti_diag = row + col not in anti_diag
        return not_in_cols and not_in_diag and not_in_anti_diag

    def backtrack(self, row, cols, diag, anti_diag, board):
            if row == self.n:
                self.result.append(board)
                return
            for col in range(self.n):
                if self.is_valid(row, col, cols, diag, anti_diag):
                    self.backtrack(
                        row + 1, 
                        cols | {col}, 
                        diag | {row - col}, 
                        anti_diag | {row + col}, 
                        board + ['.' * col + 'Q' + '.' * (self.n - col - 1)]
                    )

    def solveNQueens(self, n):
        self.n = n
        self.backtrack(0, set(), set(), set(), [])
        return self.result  
```

* `cols`，`diag`和`anti_diag`用于记录行、对角线和反对角线是否被占用。
* `board`用于记录皇后布局。
* `cols | {col}`集合求并，这里生成新变量赋值给函数参数，所以省略了重置状态。

## 练习

| 题目名称                                                     |
| ------------------------------------------------------------ |
| [47. 全排列 II](https://leetcode.cn/problems/permutations-ii/) |
| [39. 组合总和](https://leetcode.cn/problems/combination-sum/) |
| [40. 组合总和 II](https://leetcode.cn/problems/combination-sum-ii/) |
| [216. 组合总和 III](https://leetcode.cn/problems/combination-sum-iii/) |
| [78. 子集](https://leetcode.cn/problems/subsets/)            |
| [90. 子集 II](https://leetcode.cn/problems/subsets-ii/)      |
| [401. 二进制手表](https://leetcode.cn/problems/binary-watch/) |
| [130. 被围绕的区域](https://leetcode.cn/problems/surrounded-regions/) |
| [417. 太平洋大西洋水流问题](https://leetcode.cn/problems/pacific-atlantic-water-flow/) |
| [52. N 皇后 II](https://leetcode.cn/problems/n-queens-ii/)   |
| [37. 解数独](https://leetcode.cn/problems/sudoku-solver/)    |

