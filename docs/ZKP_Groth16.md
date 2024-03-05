# 1、前置知识

![algebra](https://img-blog.csdnimg.cn/20210429150145188.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2N3Mzk3MjY1MzYy,size_16,color_FFFFFF,t_70)

**（1）Group 群**

代数结构 $(R, *)$​​，二元运算根据封闭性、单位元、逆元、结合律、交换律，可以归纳成不同的群

**（2）循环群**

设 $G$ 是一个阶为 $p$（素数）的循环群，循环群中所有的元素都由一个元素生成，称这个元素 $g$（正整数）为 $G$ 的生成元

- 无限循环群

  $\{…, g^{-2}, g^{-1}, g^0, g^1, g^2, …\}$

- 有限循环群

  $\{g^0, g^1, g^, …, g^{n-1}\}$​

**（3）有限域/伽罗华域（Galois Field）上的有限循环群**

伽罗华域是仅含有限多个元素的域，其上的四则运算实际上是多项式计算

- 有限域 $GF(p)$ 中，$p$ 为素数，其加法和乘法需要对结果进行 $mod \ p$，以保证结果都是域中的元素

  - 加法 $(a + b) \ mod \ p$

  - 乘法 $(a \times b) \ mod \ p$​​
  - $GF(p)$ 中的元素为 $\{0, 1, …, p-1\}$
  - 有限域 $GF(p)$ 中 $p$ 必须是一个素数才能保证集合中的所有元素都有加法和乘法逆元（$0$ 除外），但实际应用中很多场合需要 $0$ 到 $255$ 这 $256$​ 个数字组成一个域，但 $256$ 不是素数，小于 $256$ 的最大素数为 $251$

- 因此引入 $GF(p^n)$，$p$ 为素数，通常取 $2$

  - $GF(2^n)$ 使用多项式运算，多项式表示 $f(x) = a_{n-1}x^{n-1} + … + a_1x + a_0 = \sum_{i=1}^n{a_i}{x^i}$，系数进行模 $2$ 处理，每项为 $0$ 或 $1$（$GF(3^n)$ 系数可以取 $0、1、2$）
  - 可以转换为二进制数 $a_{n-1}……a_2a_1a_0$，e.g. $f(x) = x^4 + x^3 + 1 → 11001_2$
  - $f(x) = x^3 + x^2 + 1, \ g(x) = x^2 + x + 1$
  - 加法 $f(x) + g(x) = x^3 + (2 \ mod \ 2)x^2 + x + 2 \ mod \ 2 = x^3 + x$
  - 乘法 $f(x) \times g(x) = x^5 + x + 1$​

- 有限域 $\mathbb{F}_p$ 上的椭圆曲线群

  - > ⚠️  椭圆曲线是一种形式上的称呼，实际与椭圆没有任何关系

  - > ⚠️ 与传统的有限域上的离散对数不同，使用点加法而非乘法，或者说其对乘法的定义为 $a·P = \underbrace{P + P + … + P}_{a \ times}$

  - 实数域 $R$ 上的椭圆曲线 $E = \{(x,y) \in \mathbb{R}^2 | y^2 = x^3 + ax + b, 4a^3 + 27b^2 \neq 0 \} \bigcup \{O\}$（$O$ 表示无穷远点，相当于 0）

  - 椭圆曲线是连续的，必须要把椭圆曲线变成离散的点，通过把椭圆曲线定义在有限域上的方式

  - 有限域 $\mathbb{F}_p$ 上的椭圆曲线群 $E=\{(x,y) \in (\mathbb{F_p})^2 | y^2 = x^3 + ax + b \ (mod \ p),4a^3+27b^2 \neq 0 \ (mod \ p) \} \bigcup \{ O \} $（$O$ 表示无穷远点）

  - 设 $P_1, P_2$ 为椭圆曲线上两个关于 $x$ 轴对称的点即 $P_1 = (x, y), P_2 = (x, -y)$，$P_1P_2$ 连线的延长线为无穷远，故 $P_1, P_2, O$ 三点共线，$P_1 + P_2 + O = O$，故 $P_1 = -P_2$，即称 $P_1, P_2$ 互为加法逆元，即负元，e.g. $(x, y)$ 的负元是 $(x, -y \ mod \ p) = (x, p-y)$

  - 设 $P(x_1, y_1), Q(x_2, y_2)$ 为椭圆曲线上 $x$ 坐标不同的两个点，画一条通过 $P, Q$ 的直线与椭圆曲线交于 $R_1$，根据上述定义，$P + Q + R_1 = O$，设 $R(x_3, y_3)$ 是 $R_1$ 关于 $x$ 轴对称的点即 $R = -R_1$，则 $P + Q = -R_1 = R$

    - $$
      y = kx + c \\
      (kx + c)^2 = x^3 + ax + b → x^3 - k^2x^2 + (a - 2kc)x + b - c^2 = 0 \\
      x_1 + x_2 + x_3 = -b = -(-k^2) = k^2 \\ \\
      
      \begin{aligned}
      x_3 &= k^2 - x_1 - x_2 (mod \ p)\\
      y_3 &= k(x_1 - x_3) - y_1 (mod \ p)
      \end{aligned} \\
      
      \begin{aligned}
      &where \\
      &k = \left\{
      \begin{aligned}
      &\frac{y_2 - y_1}{x_2 - x_1} (mod \ p), if \ P \neq Q \\
      &\frac{3x_1^2 + a}{2y_1} (mod \ p), if \ P = Q \ (与曲线相切), y^2 = x^3 + ax + b \ 两边求导 → 2yy' = 3x^2 + a
      \end{aligned}
      \right.
      \end{aligned}
      
      \nonumber
      $$

      <img src="https://ts1.cn.mm.bing.net/th/id/R-C.b0ea6c3d0c9d72b9f86f12fa131dc3e2?rik=QtRhxNHlAR9%2ftg&riu=http%3a%2f%2fblog.hubwiz.com%2f2020%2f06%2f16%2felliptic-curve-intro%2felliptic-curve-real.jpeg&ehk=o4WkZiEZMoYeXX0AjxRv%2bYu60r0KAcgYkJKmGtRssvs%3d&risl=&pid=ImgRaw&r=0" alt="椭圆曲线密码学" style="zoom: 33%;" />

    - 设公钥、私钥分别为 $pk$ 和 $sk$，$G$ 为基点，$pk = sk · G$，根据给定的 $sk$ 和 $G$，计算 $pk$ 很容易，但给定 $pk$ 和 $Q$，求 $sk$ 非常困难 $→ \ O(1) \ vs \ O(求解离散对数)$

**（4）Bilinear Map 双线性映射**

设 $\mathbb{G}_1、\mathbb{G}_2、\mathbb{G}_T$ 为三个素数 $p$ 阶乘法循环群，$g$ 为它的生成元，它们之间的映射关系 $e: \mathbb{G} \times \mathbb{G} \rightarrow \mathbb{G}_T$，由两个向量空间上的元素，生成第三个向量空间上一个元素，并且该函数对每个参数都是线性的

$e$ 有以下性质：

- 双线性：对于任意 $g_1 \in \mathbb{G}_1, g_2 \in \mathbb{G}_2, \ a, b \in \mathbb{Z}_p$，均有 $e(g_1^a, g_2^b) = e(g_1, g_2)^{ab}$ 成立     
- 非退化性：$\exist g_1 \in \mathbb{G}_1, g_2 \in \mathbb{G}_2, e(g_1, g_2) \neq 1_{\mathbb{G}_T}$
- 可计算性：存在有效算法，对于 $\forall g_1 \in \mathbb{G}_1, g_2 \in \mathbb{G}_2$，均可计算 $e(g_1, g_2)$

> 注：在某些定义中，$\mathbb{G}_1$ 和 $\mathbb{G_2}$ 可以为加法循环群

$e(g^a, g^b) = e(g^{ab}, g) = e(g, g^{ab}) = e(g, g)^{ab}$

$e(g, g)^s * e(g, g)^t = e(g, g)^{s+t} = e(g^{s+t}, g) = e(g, g^{s+t})$

# Reference

- https://abcdxyzk.github.io/blog/2018/04/16/isal-erase-3/
- https://www.cnblogs.com/IrisHyaline/p/17578345.html
- https://blog.csdn.net/qq_37921144/article/details/124225697
- https://www.zhihu.com/question/39641890