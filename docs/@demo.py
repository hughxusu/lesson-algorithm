class Solution:
    def numberOfBoomerangs(self, points: List[List[int]]) -> int:
        res = 0
        for p in points:
            record = {}
            for q in points:
                if p == q:
                    continue
                record[self.distance(p, q)] = record.get(self.distance(p, q), 0) + 1
            for dist in record:
                res += record[dist] * (record[dist] - 1)
        return res

    def distance(self, p: List[int], q: List[int]) -> int:
        return (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2