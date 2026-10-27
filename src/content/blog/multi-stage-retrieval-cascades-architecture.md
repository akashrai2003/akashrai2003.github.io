---
title: "Multi-Stage Retrieval Cascades: Dense Search, Cross-Encoder Reranking, and Serving Economics"
description: "How we replaced expensive third-party RAG-as-a-Service with a custom cascading retrieval pipeline, reducing operational costs by 10x while boosting precision."
pubDate: 2025-07-05
category: "RAG & Retrieval"
tags: ["RAG","Cross-Encoders","FastAPI","Pinecone","MySQL","Information Retrieval"]
---

In enterprise document intelligence, naive single-stage vector retrieval frequently creates a painful trade-off: either retrieve too few chunks and suffer from poor recall, or retrieve too many chunks and suffer from prompt bloat, high LLM token costs, and context degradation.

During my work at **DeepLogicAI**, we were tasked with optimizing an enterprise medical question-answering platform that previously relied on a third-party managed RAGaaS provider (Vectara). The service was costly and operated as a black box.

We engineered a custom **multi-stage cascading retrieval pipeline** in **FastAPI** that reduced operational costs by **~10x** while significantly improving retrieval precision.

---

## 1. The Multi-Stage Cascade Architecture

Rather than expecting a single bi-encoder model to identify the definitive top 5 chunks out of hundreds of thousands of documents, a cascading pipeline partitions retrieval into specialized filters:

```
Stage 1: Broad Dense Retrieval (Fast Recall)
Query -> Embedding Model -> Approximate Nearest Neighbors (ANN) -> Top 100 Candidates

Stage 2: Relational Metadata & Hard Filtering (Precision)
Top 100 Candidates -> MySQL Composite Indexes (Date, Author, Dept) -> Top 40 Candidates

Stage 3: Cross-Encoder Semantic Reranking (Fine Attention)
Top 40 Candidates -> Lightweight Cross-Encoder (bge-reranker) -> Top 5 Ranked Chunks

Stage 4: Token Budget Allocator
Top 5 Chunks -> Dynamic Context Budget Assembly -> Prompt to LLM
```

---

## 2. Bi-Encoders vs. Cross-Encoders: The Attention Trade-Off

- **Bi-Encoders (Embedding Models)**: Compute vector embeddings for the query and document chunks independently. While fast (allowing pre-computed vector indexing), compressing an entire chunk into a single 768-dimensional vector loses token-level interactions.
- **Cross-Encoders**: Feed the query and candidate chunk together into all transformer attention layers simultaneously. Every query token directly attends to every document token.

While running a cross-encoder across 100,000 documents is computationally prohibitive, running it across the **Top 40 candidates** identified by dense search takes only ~20ms, dramatically boosting ranking precision before hitting the generation LLM.

---

## 3. Decoupling Vector Storage from Relational Metadata

In our initial architecture, document metadata filters were stored directly inside Pinecone. However, complex multi-attribute filtering inside vector indexes was slow and costly.

We decoupled storage layers:
- **Pinecone**: Dedicated exclusively to vector IDs and similarity indices.
- **MySQL**: Houses relational metadata, access permissions, and chronological timestamps with composite B-Tree indexes.

This decoupled architecture improved metadata filtering speeds by **3x**, lowered storage costs, and gave our team full transactional control over document updates and de-duplication.
