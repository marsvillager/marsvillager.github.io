## Structure

目录结构

- **common**：通用数据结构，i.e. Merkle tree, sparse vector, etc.
- **relations**：约束关系，i.e. R1CS
- **reductions**：不同语言之间的转换
- **knowledge_commitment**：引入配对的概念，基于 multiexp
- **zk_proof_systems**：零知识证明中的不同证明系统，i.e. Groth16, GM17, etc.
- **gadgetlib1/gadgetlib2**：用于构建新电路的小工具

## Relation

### 约束可满足问题

- **R1CS** — Rank-1 Constraint System
  - $(A \mathcal{z}) \odot (B \mathcal{z}) - (C \mathcal{z}) = 0$
- **USCS** — Unitary-Square Constraint System

### 电路可满足

- **BACS** — Bilinear Arithmetic Circuit Satisfiability
- **TBCS** — Two-input Boolean Circuit Satisfiability

### RAM（Random Access Machine）

- **tinyRAM**
- **fooRAM**

### 算数程序

- **QAP** — Quadratic Arithmetic Program（GGPR13）
  - 多项式的内积运算
  - $\frac{(A(x) \mathcal{z}) \odot (B(x) \mathcal{z}) - (C(x) \mathcal{z})}{Z(x)} = H$
- **SQP** — Square Arithmetic Program（GM17）
- **SSP** — Square Span Program (DFGK14)

## ZK Proof System

libsnark 提供了四种证明系统：

- **pcd** (Proof-Carrying Data)

  - 由 Chiesa 等人在 2010 年论文《[Proof-Carrying Data and Hearsay Arguments from Signature Cards](https://people.eecs.berkeley.edu/~alexch/docs/CT10.pdf)》中提出，可用于不信任的各方进行分布式无限计算，保证每个计算的中间状态都可以succinctly verified
  - r1cs_pcd

- **ppzkadsnark** (PreProcessing Zero-Knowledge Succinct Non-interactive Argument of Knowledge Over Authenticated Data)

  - r1cs_ppzkadsnark

- **ppzksnark** (PreProcessing Zero-Knowledge Succinct Non-interactive Argument of Knowledge)

  - `preprocessing` 其实就是指我们常说的 trusted setup，即在证明生成和验证之前，需要通过一个生成算法来创建相关的公共参数（**pk: proving key** 和 **vk: verification key**）。我们也把这个提前生成的参数称为 「公共参考串」（Common Reference String），或简称为 CRS。

  - bacs_ppzksnark

  - r1cs_ppzksnark, **PGHR13/BCTV14a**

  - r1cs_gg_ppzksnark, gg = General Group, **Groth16**

    - primary input: statement
    - auxiliary input: witness

    ![groth16](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*LY1JDHWJFVHddIwQMjzYGw.png)

  - r1cs_se_ppzksnark, se = Simulation Extractable, **GM17**

  - ram_ppzksnark

  - tbcs_ppzksnark

  - uscs_ppzksnark

- **zksnark** (Zero-Knowledge Succinct Non-interactive Argument of Knowledge)

  - ram_zksnark

## Reference

- https://trapdoortech.medium.com/zero-knowledge-proof-deep-into-libsnark-a3f02949f064