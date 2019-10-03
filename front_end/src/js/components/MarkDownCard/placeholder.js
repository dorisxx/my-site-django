const input = `
### What does 'Greedy' mean?
<img src="https://pbs.twimg.com/profile_images/810461243991408640/qh9qTRnw_400x400.jpg" width="500"></img>
<br/>

## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

<br/>

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!


\`\`\`python  

    def detectCycleDFS(root, node, visited, graph):
        if node not in visited:
            visited[node] = root
            for ancestor in graph[node]: 
                  if detectCycleDFS(root, ancestor, visited, graph):
                      return True
        elif visited[node]==root:
             return True

\`\`\`

<br/>
<blockquote>
To summarize, for dense graphs with a lot of edges, Prim algorithm is much faster because it could use Fibonacci Heap to achieve O(|E|+|V|log|V|) which is a huge improvement compared to O(|E|log|V|), even if we don't use Fibonacci heap, it's still much faster since Kruskal needs to sort the edges and that gives O(|E|log|E|) in worst case.

</blockquote>


\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');

React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`

Pretty neat, eh?

## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

## More info?
<span style="color:red">some **This is Red Bold.** text</span>

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

## Table of Contents

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?

\`\`\`python
print('hahahah')
\`\`\`


Pretty neat, eh?

`;

export default input;
