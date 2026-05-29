# 动态规划

动态规划（dynamic programming简称DP）是一个重要的算法范式，它将一个问题分解为一系列更小的子问题，并通过存储子问题的解来避免重复计算（保证每个子问题只计算一次），从而大幅提升时间效率。

对于斐波那契数列求解问题

<img src="https://hughxusu.github.io/lesson-py/assets/v2-74704e7bf8edf09f5d318596f9cb0889_1440w.C8KI77Qt.webp" style="zoom:80%;" />

```python
def fib(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fib(n - 2) + fib(n - 1)
```

> [!think]
>
> 为什么斐波那契数列求解过程这么慢？

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/6a8b8955dfb30b1a7625814fa75e5743.png" style="zoom:45%;" />

统计`fib(20)`的调用次数

```python
def counter(decorator):
    def wrapper(*args, **kwargs):
        wrapper.counter += 1
        return decorator(*args, **kwargs)
    wrapper.counter = 0
    return wrapper
  
@counter
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

fib(20)
print(f'fib(20) 调用了 {fib.counter} 次')
```

## 斐波那契数列优化

### 记忆化搜索

为了提升算法效率，所有的重叠子问题只被计算一次，需要记录已经计算过的子问题。

```python
memo = {}

@counter
def fib_memo(n):
    if n <= 1:
        return n
    if n not in memo:
        memo[n] = fib_memo(n - 1) + fib_memo(n - 2)
    return memo[n]

fib_memo(20)
print(f'fib_memo(20) 调用了 {fib_memo.counter} 次')
```

* 使用`memo = {}`记录过已经计算过的递归：
  * 如果不存在递归调用并记录结果。
  * 如果存在直接返回，`memo`中记录过的值，跳过递归。
* 使用记忆化搜索的方式，函数的调用次数是$2n-1$次。

> [!note]
>
> 通过记忆化搜索，所有重叠子问题都只需计算一次，时间复杂度优化至$O(n)$，空间复杂度为$O(n)$。记忆化搜索是“以空间换时间”的典型应用。

### 动态规划

* 记忆化搜索是一种“从顶至底”的方法。
* 动态规划是一种“从底至顶”的方法：从最小子问题的解开始，迭代地构建更大子问题的解，直至得到原问题的解。

斐波那契数列的动态规划求解

```python
memo = {}

def fib_dynamic(n):
    if n <= 1:
        return n
    memo = {0: 0, 1: 1}
    for _ in range(2, n + 1):
        memo[_] = memo[_ - 1] + memo[_ - 2]
    return memo[n]

print(f'fib_dynamic(20) = {fib_dynamic(20)}')
```

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/develop/images/parctice/20201115153305916.png" style="zoom:75%;" />

|      | 递归                              | 动态规划                            |
| :--- | :-------------------------------- | :---------------------------------- |
| 方向 | 想知道F(10)，需要先知道F(9)和F(8) | 先算F(1)、F(2)，然后一步步推到F(10) |
| 视角 | 关注如何分解问题                  | 关注如何组合子问题的解              |

* 动态规划中的递推式叫状态转移方程（State Transition Equation），和递归中的递推式没区别。

> [!warning]
>
> 通常情况下，动态规划用循环实现，记忆化搜索通常用递归实现，但这不是本质区别。

Dynamic Programming（动态规划）中Programming是指一种表格规划方法，Dynamic表示状态转移过程。Dynamic Programming可以理解为状态转移表格或递推填表法。

> [!think]
>
> 思考[70. 爬楼梯](https://leetcode.cn/problems/climbing-stairs/)的动态规划求解。

## 动态规划的应用

**[343. 整数拆分](https://leetcode.cn/problems/integer-break/)**

* 因为拆分的个数`k`未知，如果使用穷举法，应该采用回溯法。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/l343.jpg" style="zoom: 50%;" />

> [!note]
>
> 最优子结构：通过求子问题的最优解，可以获得原问题的最优解。

1. 递归解法

```python
class Solution:
    def integerBreak(self, n: int) -> int:
        if n == 1:
            return 1

        result = -1
        for i in range(1, n):
            result = max(result, i * (n - i), i * self.integerBreak(n - i))
        return result
```

* `max(result, i * (n - i), i * self.integerBreak(n - i))`
  * `result`保留之前所有拆分方案。
  * `i * (n - i)`只把数字拆成两份$i$和$n-i$。
  * `i * self.integerBreak(n - i)`把数字拆成$i$和继续被拆分的$n-i$。

2. 记忆化搜索

```python
class Solution:
    def __init__(self):
        self.memo = {}

    def integerBreak(self, n: int) -> int:
        if n == 1:
            return 1

        if n in self.memo:
            return self.memo[n]

        result = -1
        for i in range(1, n):
            result = max(result, i * (n - i), i * self.integerBreak(n - i))
        self.memo[n] = result   
        return result
```

* `if n in self.memo`表示如果`n`的拆分最大值被记录过，直接返回。
* `self.memo[n] = result`每次计算结束后记录拆分最大值。

3. 动态规划

```python
class Solution:
    def integerBreak(self, n: int) -> int:
        memo = {}
        memo[1] = 1
        for i in range(2, n + 1):
            memo[i] = -1
            for j in range(1, i):
                memo[i] = max(memo[i], j * (i - j), j * memo[i - j])
       
        return memo[n]
```

* `j * (i - j)`将数值`i`分割为`j`和`i-j`的两部分。

> [!note]
>
> 解决动态规划问题的路径：
>
> 1. 找到转态转移方程，使用递归方法实现。
> 2. 在递归中引入记忆化搜索，降低时间复杂度。
> 3. 使用自底向上的方式，实现记忆化搜索，即：将递归改为循环。

**[198. 打家劫舍](https://leetcode.cn/problems/house-robber/)**

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/Xnip2026-03-20_10-01-10.jpg" style="zoom:75%;" />

1. 递归解法

```python
class Solution:
    def try_rob(self, nums: List[int], start: int, end: int) -> int:
        if start > end:
            return 0
        if start == end:
            return nums[start]

        result = max(
            self.try_rob(nums, start + 1, end), 
            nums[start] + self.try_rob(nums, start + 2, end)
        )
        return result

    def rob(self, nums: List[int]) -> int:
        if not nums:
            return 0

        return self.try_rob(nums, 0, len(nums) - 1)
```

* `nums[start] + self.try_rob(nums, start + 2, end)`偷取当前值和隔一个的最大值。
* `self.try_rob(nums, start + 1, end)`不偷取当前值，偷取剩下值。

2. 记忆化搜索

```python
class Solution:
    def __init__(self):
        self.memo = {}

    def try_rob(self, nums: List[int], start: int, end: int) -> int:
        if start > end:
            return 0
        if start == end:
            return nums[start]

        if (start, end) in self.memo:
            return self.memo[(start, end)]
        
        result = max(
            self.try_rob(nums, start + 1, end), 
            nums[start] + self.try_rob(nums, start + 2, end)
        )
        self.memo[(start, end)] = result
        return result

    def rob(self, nums: List[int]) -> int:
        if not nums:
            return 0

        return self.try_rob(nums, 0, len(nums) - 1)
```

3. 动态规划

```python
class Solution:
    def rob(self, nums: List[int]) -> int:
        if not nums:
            return 0
        n = len(nums)
        if n == 1:
            return nums[0]

        # dp[i] 表示前 i 个房子能偷到的最大金额
        dp = [0] * n
        
        # 初始状态
        dp[0] = nums[0]
        dp[1] = max(nums[0], nums[1])

        for i in range(2, n):
            # 状态转移：不偷当前的（取前一个的最大值）vs 偷当前的和隔一个的最大值
            dp[i] = max(dp[i-1], nums[i] + dp[i-2])

        return dp[n-1]
```

> [!think]
>
> 上面的状态转移方程不唯一，思考还有什么其他状态转移方程。

## 0-1背包问题

背包问题是动态规划中最常见的问题形式，且具有很多变体，如：完全背包问题、多重背包问题等。

> [!think]
>
> 给定$n$个物品，第$i$个物品的重量为$wgt[i-1]$ 、价值为$val[i-1]$，和一个容量为$cap$的背包。每个物品只能选择一次，问在限定背包容量下能放入物品的最大价值。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/knapsack_example.png" style="zoom:65%;" />

穷举法

* 对于每一件物品有放入和不放入2种选择，如果有$n$件物品，根据乘法原理：$2 \times 2 \times \dots \times 2 = 2^n$，共$2^n$物品的组合。
* 判断每一种组合是否超过容量，保留没有超过容量的组合。
* 计算可能组合的价值，选择价值最大的。

> [!think]
>
> 优先放入平均价值最高的物品是否可行？

物品的容量和价值如下，背包容量为5。

| 物品     | a    | b    | c    |
| -------- | ---- | ---- | ---- |
| 价值     | 6    | 10   | 12   |
| 重量     | 1    | 2    | 3    |
| 平均价值 | 6    | 5    | 4    |

* 按照平均价值最大选择物品a和b，总价值为6+10=16。
* 实际价值最大的选择是b和c，总价值为10+12=22。

对于每一件物品有放入和不放入背包两种选择，所以状态转移方程为
$$
F(i, c)=\max\left \{F(i-1, c), v(i)+F(i-1, c-w(i))\right \}
$$

* $c$背包的总总量。
* $F(i-1, c)$第$i$个物品不放入背包中。
* $v(i)+F(i-1, c-w(i))$第$i$个物品放入背包中，$v(i)$表示第$i$个物品的价值，$w(i)$表示第$i$个物品的总量。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/knapsack_dfs.png" style="zoom:65%;" />

1. 记忆化搜索

```python
mem = {}

def knapsack_dfs_mem(wgt, val, i, c):
    # 若已选完所有物品或背包无剩余容量，则返回价值0
    if i < 0 or c == 0:
        return 0

    # 若已有记录，则直接返回
    if (i, c) in mem:
        return mem[(i, c)]

    # 计算不放入物品i的最大价值
    no = knapsack_dfs_mem(wgt, val, i - 1, c)

    # 若超过背包容量，则只能选择不放入背包
    if wgt[i] > c:
        mem[(i, c)] = no
        return no

    # 计算放入物品i的最大价值
    yes = val[i] + knapsack_dfs_mem(wgt, val, i - 1, c - wgt[i])

    # 记录并返回两种方案中价值更大的那一个
    mem[(i, c)] = max(no, yes)
    return mem[(i, c)]  


wgt = [10, 20, 30, 40, 50]
val = [50, 120, 150, 210, 240]
cap = 50
result = knapsack_dfs_mem(wgt, val, len(wgt) - 1, cap)
print(result)
```

* 优化过程有两个限制，物品`i`和容量`c`，`mem = {}`用于记录物品和容量的组合是否被计算过。
* `len(wgt) - 1`表示从列表的最后一个元素开始处理。

2. 动态规划

```python
def knapsack_dp(wgt: list[int], val: list[int], cap: int) -> int:
    n = len(wgt)
    dp = [[0] * (cap + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for c in range(1, cap + 1):
            if wgt[i - 1] > c:
                # 若超过背包容量，则不选物品 i
                dp[i][c] = dp[i - 1][c]
            else:
                # 不选和选物品 i 这两种方案的较大值
                dp[i][c] = max(dp[i - 1][c], dp[i - 1][c - wgt[i - 1]] + val[i - 1])
    return dp[n][cap]
```

* `dp`动态规划表
  * 行`i`代表可选物品的范围。
  * 列`c`代表当前的背包容量。
  * `dp[i][c]`表示前`i`个物品，且背包容量为`c` `时，能拿到的最大价值。
* 上面算法的时间复杂度和空间复杂度都为$O(n\times c)$。

![](https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/Xnip2026-03-22_20-12-47.jpg)

3. 优化空间复杂度
   * 由于每个状态都只与其上一行的状态有关，因此可以使用两个数组滚动前进，将空间复杂度从$O(n^2)$降至$O(n)$。
   * 如果采用倒序遍历，只需要一行数组就可以。

```python
def knapsack_dp_comp(wgt: list[int], val: list[int], cap: int) -> int:
    n = len(wgt)
    dp = [0] * (cap + 1)
    for i in range(1, n + 1):
        # 倒序遍历
        for c in range(cap, 0, -1):
            if wgt[i - 1] > c:
                dp[c] = dp[c]
            else:
                dp[c] = max(dp[c], dp[c - wgt[i - 1]] + val[i - 1])
    return dp[cap]

wgt = [10, 20, 30, 40, 50]
val = [50, 120, 150, 210, 240]
cap = 50
result = knapsack_dp_comp(wgt, val, cap)
print(result)
```

**[416. 分割等和子集](https://leetcode.cn/problems/partition-equal-subset-sum/)**

该问题等价于从n个物品中选择一定物品，使其总量等于总重量的一半。

* 总重量的一半等价于背包的`cap`值，所以该问题可以看做0-1背包问题。
* 该问题不需要考虑物品的价值，但是背包需要完全填满。

> [!warning]
>
> 许多0-1背包问题，形式上并不是背包问题，但是本质上与背包问题类似。

函数$F(n,c)$表示用$n$个物品填满容量为$c$的背包
$$
F(i,c)=F(i-1, c) \or F(i-1, c-w(i))
$$

* $F(i-1, c)$表示使用$i-1$个物品填满了容量$c$。
* $F(i-1, c-w(i))$表示用$i-1$个物品填满，$c-w(i)$的容量，$w(i)$是第$i$个物品的重量。

1. 使用记忆化搜索

```python
class Solution:
    def __init__(self):
        self.memo = {}

    def try_partition(self, nums, end, target) -> bool:
        if target == 0:
            return True

        if target < 0 or end < 0:
            return False

        if (end, target) in self.memo:
            return self.memo[(end, target)]

        self.memo[(end, target)] = (
            self.try_partition(nums, end - 1, target) or 
            self.try_partition(nums, end - 1, target - nums[end])
        )

        return self.memo[(end, target)]

    def canPartition(self, nums: List[int]) -> bool:
        total = sum(nums)

        if total % 2 != 0:
            return False

        target = total // 2
        return self.try_partition(nums, len(nums) - 1, target)
```

2. 使用动态规划的方法
3. <img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/leecode-416.jpg" style="zoom:75%;" />

```python
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        total = sum(nums)
        if total % 2 != 0:
            return False

        target = total // 2
        dp = [False] * (target + 1)
        dp[0] = True

        for num in nums:
            for i in range(target, num - 1, -1):
                if dp[i - num]:
                    dp[i] = True
       
        return dp[target]
```

* `for i in range(target, num - 1, -1)`倒序遍历`target`到`num`
  * `range`是左闭右开区间，`num-1`截止，表示执行到`i=num`。
  * 如果`target`小于`num`则，则背包里装不下`num`值。
  * 如果`target`大于`num`，从`target`遍历到`num`。
    * 如果`dp[i - num]`能被凑出，`dp[i]`就可以被凑出。
    * 因为`dp[i] = dp[i - num] + num`。
* 处理完`dp`数组后，根据`dp[target]`判断`target`是否可以凑出。

## 最长上升子序列问题

**[300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/)**

任意一个数组有选择和不选择两种可能，而$LIS(i)$表示以第$i$个数字为结尾的最长上升子序列。这里的子序列不需要连续。

$LIS(i)$表示`[0…i]`的范围内，且选择数字`num[i]`可以获得的最长上升子序列的长度。
$$
LIS(i)=\max_{j<i}\left(1+ LIS(j)\right) \quad \text{if} \quad  \text{num} \left[i\right]>\text{num}\left[j\right]
$$

* 其中`num[j]`包含在`[0…i]`的范围内，`j`在`i`的前面。

<img src="https://raw.githubusercontent.com/hughxusu/lesson-algorithm/refs/heads/develop/images/parctice/Xnip2026-03-21_18-58-53.jpg" style="zoom:45%;" />

1. dp数组的长度记录了最长上升子序列的长度
2. 初始时`dp`表的值为1，当数组为降序排序时，最长上升子序列即为1。
3. 根据递推式不断更新数组的值。

```python
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        n = len(nums)
        if n == 0:
            return 0
        dp = [1] * n
        for i in range(1, n):
            for j in range(i):
                if nums[i] > nums[j]:
                    dp[i] = max(dp[i], dp[j] + 1)
        return max(dp)
```

* `for j in range(i)`遍历`i`前面的值存在`num[i] > num[j]`更新dp数组的最大值。

与最长上升子序列类似的问题[最长公共子序列问题](https://www.cnblogs.com/labuladong/p/13945482.html)

## 练习

| 题目名称                                                     |
| ------------------------------------------------------------ |
| [120. 三角形最小路径和](https://leetcode.cn/problems/triangle/) |
| [64. 最小路径和](https://leetcode.cn/problems/minimum-path-sum/) |
| [279. 完全平方数](https://leetcode.cn/problems/perfect-squares/)（动态规划求解） |
| [91. 解码方法](https://leetcode.cn/problems/decode-ways/)    |
| [62. 不同路径](https://leetcode.cn/problems/unique-paths/)   |
| [63. 不同路径 II](https://leetcode.cn/problems/unique-paths-ii/) |
| [213. 打家劫舍 II](https://leetcode.cn/problems/house-robber-ii/) |
| [337. 打家劫舍 III](https://leetcode.cn/problems/house-robber-iii/) |
| [309. 买卖股票的最佳时机含冷冻期](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/) |
| [322. 零钱兑换](https://leetcode.cn/problems/coin-change/)   |
| [377. 组合总和 Ⅳ](https://leetcode.cn/problems/combination-sum-iv/) |
| [474. 一和零](https://leetcode.cn/problems/ones-and-zeroes/) |
| [139. 单词拆分](https://leetcode.cn/problems/word-break/)    |
| [494. 目标和](https://leetcode.cn/problems/target-sum/)      |
| [376. 摆动序列](https://leetcode.cn/problems/wiggle-subsequence/) |
