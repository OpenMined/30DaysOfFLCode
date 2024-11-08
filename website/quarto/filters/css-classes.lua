function CodeBlock(el)
  el.attributes["_jupyterCode"] = "true"
  print("processed code block:")
  print(pandoc.write(pandoc.Pandoc({el}), "markdown"))
  return el
end
