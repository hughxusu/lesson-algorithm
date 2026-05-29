# 图

图（graph）是一种非线性数据结构，由顶点（vertex）和边（edge）组成。图$G$可以抽象地表示为一组顶$V$和一组边$E$的集合。图的数学表示为
$$
\begin{aligned}{}
& V=\left\{1,2,3,4,5\right\} \\
& E=\left\{(1,2),(1,3),(1,5),(2,3),(2,4),(2,5),(4,5)\right\} \\
& G=\left \{ G,V \right \} 
\end{aligned}
$$
如果将顶点看作节点，将边看作连接各个节点的线，上面的图可以表示为

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/linkedlist_tree_graph.png" style="zoom:70%;" />

图模型的应用：

* 飞机航线
* 社交网络
* 计算机网络

## 图的分类和术语

### 图的分类

根据边是否具有方向，可分为无向图（undirected graph）和有向图（directed graph）：

* 在无向图中，边表示两顶点之间的“双向”连接关系，例如微信或QQ中的“好友关系”。
* 在有向图中，边具有方向性，即$A\rightarrow B$和$B\rightarrow A$两个方向的边是相互独立的，例如微博或抖音上的“关注”与“被关注”关系。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/directed_graph.png" style="zoom:65%;" />

有向图由于不对称性，相关算法难度更大。

根据所有顶点是否连通，可分为连通图（connected graph）和非连通图（disconnected graph）。

- 对于连通图，从某个顶点出发，可以到达其余任意顶点。
- 对于非连通图，从某个顶点出发，至少有一个顶点无法到达。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/connected_graph.png" style="zoom:65%;" />

根据边的“权重”变量，可以分为有权图（weighted graph）和无权图（unweighted graph）。

* 有权图每个边上都有权重变量。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/weighted_graph.png" style="zoom:65%;" />

### 常用术语

- 邻接（adjacency）：当两顶点之间存在边相连时，称这两顶点“邻接”。
- 路径（path）：从顶点A到顶点B经过的边构成的序列被称为从A到B的“路径”。
- 度（degree）：一个顶点拥有的边数。对于有向图，入度（in-degree）表示有多少条边指向该顶点，出度（out-degree）表示有多少条边从该顶点指出。

![](https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/886021-20180604170225502-1577370842.png)

* 自环边（self-loop）：一条边的两个端点都是同一个顶点。
* 平行边（parallel edges）：两个顶点之间存在两条或两条以上的边，这些边连接的是同一对顶点。
* 简单图：没有自环边和平行边的图。

## 图的实现

图的常用实现方式包括“邻接矩阵”和“邻接表”。

### 邻接矩阵

设图的顶点数量为$n$，邻接矩阵（adjacency matrix）使用一个$n\times n$大小的矩阵来表示图，每一行（列）代表一个顶点，矩阵元素代表边，用1或0表示两个顶点之间是否存在边。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/adjacency_matrix.png" style="zoom:65%;" />

* 对于无向图，两个方向的边等价，此时邻接矩阵关于主对角线对称。
* 使用邻接矩阵表示图时，可以直接访问矩阵元素以获取边，因此增删查改操作的效率很高，时间复杂度均为$O(1)$。
* 矩阵的空间复杂度为$O(n^2)$，内存占用较多。

图的定义为

```python
class GraphAdjMat:
    def __init__(self):
        self.vertices = []
        self.adj_mat = []

    def size(self):
        return len(self.vertices)

    def print(self):
        print("顶点列表 =", self.vertices)
        print("邻接矩阵 =")
        s = []
        for arr in self.adj_mat:
            s.append("  " + str(arr))
        print("[\n" + ",\n".join(s) + "\n]")
```

* 定点数组`vertices`，初始化为空。
* 邻接矩阵`adj_mat`，初始化为空数组。

添加节点

```python
class GraphAdjMat:
    ...
    def add_vertex(self, val):
        n = self.size()
        self.vertices.append(val)
        new_row = [0] * n
        self.adj_mat.append(new_row)
        for row in self.adj_mat:
            row.append(0)
```

* `self.vertices.append(val)`添加一个顶点值。
* `self.adj_mat.append(new_row)`在接临矩阵中添加一行。
* `for row in self.adj_mat:`在每一行元素后面添加一个元素。
* 整体操作的时间复杂度为`O(n)`。

添加和删除边

```python
class GraphAdjMat:
    ...
    def add_edge(self, i, j):
        if i < 0 or j < 0 or i >= self.size() or j >= self.size() or i == j:
            raise IndexError()
        self.adj_mat[i][j] = 1
        self.adj_mat[j][i] = 1

    def remove_edge(self, i, j):
        if i < 0 or j < 0 or i >= self.size() or j >= self.size() or i == j:
            raise IndexError()
        self.adj_mat[i][j] = 0
        self.adj_mat[j][i] = 0
```

* 添加和删除边需要设置接临矩阵的对角元素。

删除节点

```python
class GraphAdjMat:
    ...
    def remove_vertex(self, index):
        if index >= self.size():
            raise IndexError()
        self.vertices.pop(index)
        self.adj_mat.pop(index)
        for row in self.adj_mat:
            row.pop(index)
```

* `self.vertices.pop(index)`删除`index`顶点值。
* `self.adj_mat.pop(index)`删除接临矩阵的`index`行。
* `for row in self.adj_mat:`删除接临矩阵每一行的`index`元素。
* 删除顶点时需要移动每个元素，时间复杂度为$O(n^2)$。

### 邻接表

邻接表（adjacency list）使用$n$个链表来表示图，链表节点表示顶点。第$i$个链表对应顶点$i$，其中存储了该顶点的所有邻接顶点。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/adjacency_list.png" style="zoom:65%;" />

* 邻接表仅存储实际存在的边，而边的总数通常远小于$n^2$，因此它更加节省空间。
* 在邻接表中需要通过遍历链表来查找边，因此其时间效率不如邻接矩阵。

图的定义为

```python
class GraphAdjList:
    def __init__(self):
        self.adj_list = {}

    def size(self) -> int:
        return len(self.adj_list)

    def print(self):
        print("邻接表 =")
        for vertex in self.adj_list:
            tmp = [v for v in self.adj_list[vertex]]
            print(f"{vertex}: {tmp},")
```

* `self.adj_list`顶点和边使用字典统一存储。

添加节点

```python
class GraphAdjList:
    ...
    def add_vertex(self, vet):
        if vet in self.adj_list:
            return
        self.adj_list[vet] = set()
```

* 添加节点，只需要添加键值对，键为节点，值为空集合，时间复杂度为$O(1)$。
* 使用`set`保存边，避免边的重复。

添加和删除边

```python
class GraphAdjList:
    ...
    def add_edge(self, vet1, vet2):
        if vet1 not in self.adj_list or vet2 not in self.adj_list or vet1 == vet2:
            raise ValueError()
        self.adj_list[vet1].add(vet2)
        self.adj_list[vet2].add(vet1)

    def remove_edge(self, vet1, vet2):
        if vet1 not in self.adj_list or vet2 not in self.adj_list or vet1 == vet2:
            raise ValueError()
        self.adj_list[vet1].discard(vet2)
        self.adj_list[vet2].discard(vet1)
```

* 添加和删除边，只需要从`set`中增加或移除对应顶点，时间复杂度为$O(1)$。

删除节点

```python
class GraphAdjList:
    ...
    def remove_vertex(self, vet):
        if vet not in self.adj_list:
            raise ValueError()
        self.adj_list.pop(vet)
        for vertex in self.adj_list:
            if vet in self.adj_list[vertex]:
                self.adj_list[vertex].discard(vet)
```

* 删除顶点，要删除对应的键值对，遍历其他顶点集合，移除对应的顶点值。

![](https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/6821009975_db90b7b53f_z.jpg)

根据边的密度分类

* 稀疏图：一个图中的边数$E$远小于顶点数$V$的平方（即 $E \ll V^2$）。
* 稠密图：一个图中的边数 $E$ 接近于顶点数 $V$ 的平方（即 $E \approx V^2$）。
* 完全图：图中任意两个顶点之间都有一条边直接相连。

稀疏图一般使用接邻表进行表示；稠密图和完全图一般使用接临矩阵进行表示。

> [!warning]
>
> 现实应用中绝大多数图都是稀疏图，一般采用邻接表的方式来存储。

## 图的遍历

### 深度优先

深度优先遍历是一种优先走到底、无路可走再回头的遍历方式。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/graph_dfs.png" style="zoom:65%;" />

深度优先遍历可以采用递归算法实现：

1. 访问当前节点：记录访问顺序，并记录该节点是否访问过。
2. 遍历与该节点相邻的节点
   1. 如果访问过该节点，跳过。
   2. 没有方法过递归执行`1.`步。

需要借助`set`数据类型来记录节点是否访问过。

```python
def dfs(graph, visited, res, vet):
    res.append(vet)
    visited.add(vet)
    for adj_vet in graph.adj_list[vet]:
        if adj_vet not in visited:
            dfs(graph, visited, res, adj_vet)
```

时间复杂度

1. 所有顶点都会入队并出队一次，时间复杂度为$O(V)$。
2. 每个节点在`set`中存储2次表示边，访问的时间复杂度为$O(E)$。
3. 总体时间复杂度为$O(E+V)$。

### 广度优先

广度优先遍历是一种由近及远的遍历方式，从某个节点出发，始终优先访问距离最近的顶点，并一层层向外扩张。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/graph_bfs.png" style="zoom:65%;" />

广度优先遍历通常借助队列来实现：

1. 将遍历起始顶点加入队列，并开启循环。
2. 在循环的每轮迭代中，弹出队首顶点并记录访问，然后将该顶点的所有邻接顶点加入到队列尾部。
3. 循环步骤`2.`，直到所有顶点被访问完毕后结束。

```python
import collections

def bfs(graph, res, start_vet):
    queue = collections.deque([start_vet])
    visited = {start_vet}
    while queue:
        vet = queue.popleft()
        res.append(vet)
        for adj_vet in graph.adj_list[vet]:
            if adj_vet not in visited:
                queue.append(adj_vet)
                visited.add(adj_vet)
```

时间复杂度与深度优先遍历一致。

> [!warning]
>
> 无权图的广度优先遍历可以解决最短路径问题。

## 相关问题

许多可以用图方法解决的实际问题，中并没有明确的提示该问题是图相关的问题，需要程序员有建模的能力。

**[279. 完全平方数](https://leetcode.cn/problems/perfect-squares/)**

* 任何的正整数$n$，都可以表示成完全平方数的和，可以用1表示。
* 从当前数字中尝试减去所有可能的完全平方数，生成下一层搜索的节点。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/Perfect-Squares.jpg" style="zoom: 50%;" />

* 如果你第一次遇到某个数字$x$，当前走的路径一定是从起点到$x$的最短路径。
  1. 路径A：$13\rightarrow 12 \rightarrow 8$ （步数 = 3）
  2. 路径B：$13 \rightarrow 9 \rightarrow 8 $ （步数 = 3）
  3. 不管是路径A还是路径B，从8开始，到零的最小步数一定是一样的。所以路径A和路径B的最小步数一定一致，那么路径B就没有必要计算了。
* 上面的问题实际上是图的广度优先遍历。

```python
class Solution:
    def numSquares(self, n: int) -> int:
        queue = deque([(n, 0)])
        visited = set([n])
        while queue:
            num, step = queue.popleft()
            if num == 0:
                return step

            i = 1
            while i * i <= num:
                next_num = num - i * i
                if next_num not in visited:
                    queue.append((next_num, step + 1))
                    visited.add(next_num)
                i += 1
```

## 练习

| 题目名称                                                     |
| ------------------------------------------------------------ |
| [127. 单词接龙](https://leetcode.cn/problems/word-ladder/)   |
| [126. 单词接龙 II](https://leetcode.cn/problems/word-ladder-ii/) |



