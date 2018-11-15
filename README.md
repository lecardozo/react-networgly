# react-networgly

```
npm install --save react-networgly
```

React component for the networgly.

## <Networkgly /> Properties

| Name              |Default| Type      | Description |
|:------------------|:------|:----------|:------------------------------|
| width             |       | number    | The width of the canvas element |
| height            |       | number    | The height of the canvas element |
| edges             |       | array     | List of edges in your graph |
| nodes             |       | array     | List of nodes in your graph |
| onNodeHover       |       | function  | Callback invoked when mouse is over a node. Function signature: `({ node: object, x: number, y:number })`, where `x` and `y` are the mouse coordinates when the event was fired |
| onDrag            |       | function  | Callback invoked when zoom or drag events occur. Function signature: `({ x: number, y: number, scale: number })` | 
| transform         | {}    | object    | Object defining the current center position (x,y) and scale of visualization |
