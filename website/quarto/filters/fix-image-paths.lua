function Image(el)
    print("Original image path: " .. el.src)
    if string.match(el.src, "^%.%./%.%./") then
        el.src = string.gsub(el.src, "^%.%./%.%./", "/")
        print("Modified image path: " .. el.src)
    end
    return el
end
