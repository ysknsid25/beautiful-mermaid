**⚠️このリポジトリは[lukilabs/beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid)のforkです。StarやSponsorなどは本家リポジトリの方へお願いいたします。⚠️**

詳細が気になる人は[ブログ](https://blog.inorinrinrin.com/entry/2026/02/26/113056)を読んでください。

# このリポジトリの存在意義

`browser.ts`をはてなブログ等、Webアプリケーションから部分的に利用するにあたりCDNにビルドしたjsを配信するために存在しています。

# はてなブログでの利用方法

以下を 「詳細設定 > <head>要素にメタデータを追加」 に追加してください。

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/ysknsid25/beautiful-mermaid@main/dist/beautiful-mermaid.browser.min.js"></script>
```

あとはブログ記事内で以下のようにMermaid記法の文章を埋め込むだけです。

```
```mermaid
flowchart TD
    subgraph LIB["@myapp/logger"]
        appLogger
        adminLogger
        batchLogger
        workerLogger
    end

    subgraph APP["src/app/"]
        A1["アプリケーション層"]
    end

    subgraph ADMIN["src/admin/"]
        A2["管理画面層"]
    end

    subgraph BATCH["src/batch/"]
        A3["バッチ処理層"]
    end

    subgraph WORKER["src/worker/"]
        A4["ワーカー層"]
    end

    appLogger    -->|"✅ 許可"| A1
    adminLogger  -->|"✅ 許可"| A2
    batchLogger  -->|"✅ 許可"| A3
    workerLogger -->|"✅ 許可"| A4

    adminLogger  -.->|"❌ 禁止"| A1
    batchLogger  -.->|"❌ 禁止"| A1
    workerLogger -.->|"❌ 禁止"| A1

    appLogger    -.->|"❌ 禁止"| A2
    batchLogger  -.->|"❌ 禁止"| A2
    workerLogger -.->|"❌ 禁止"| A2

    appLogger    -.->|"❌ 禁止"| A3
    adminLogger  -.->|"❌ 禁止"| A3
    workerLogger -.->|"❌ 禁止"| A3

    appLogger    -.->|"❌ 禁止"| A4
    adminLogger  -.->|"❌ 禁止"| A4
    batchLogger  -.->|"❌ 禁止"| A4
```


これは以下のように表示されます。

![alt text](image.png)

あとはCSS等を使って、親要素に対する`width`等を設定してあげればOKです。
