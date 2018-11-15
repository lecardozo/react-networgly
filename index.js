import React from "react";
import PropTypes from "prop-types";
import ngraph from "ngraph.graph";
import createNetworgly from "networkgly";

let currentNodeStyle = {
    position: 'absolute',
    color: 'black',
    backgroundColor: 'white',
    padding: 5
}

class Networgly extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        isHovering: false,
        isStable: false,
        currentNode: null,
        tooltipX: null,
        tooltipY: null
    }

    const { edges } = props

    this.graph = ngraph()

    this.graph.beginUpdate()
    for (var i = 0; i < edges.length; i++) {
      if (!(edges[i][0] === null) & !(edges[i][1] === null)) {
          this.graph.addLink(edges[i][0], edges[i][1]);
      }
    }
    this.graph.endUpdate()
  }

  componentDidMount() {
     this.chart = networkGL(this.graph, {
         canvas: this.canvas,
         onNodeHover: ({ node, x, y }) => {
             this.setState({
                 currentNode: node,
                 tooltipX: x,
                 tooltipY: y
             })
         },
         onDrag: this.props.onDrag,
         transform: this.props.transform
     })
     this.chart.render()
  }

  shouldComponentUpdate(nextProps, nextState) {

    if ( this.props.edges !== nextProps.edges ) {
        this.graph.clear();
        this.nodes = {}
        for (var i = 0; i < nextProps.edges.length; i++) {
          this.graph.addLink(nextProps.edges[i][0],
                             nextProps.edges[i][1]);
        }
    } 

    if (this.props.width !== nextProps.width | 
        this.props.height !== nextProps.height) {
        this.chart.resize()
        return true
    }

    if (this.state.currentNode !== nextState.currentNode) {
        return true
    }

    return false
  }

  componentWillUnmount() {
      this.chart.stop()
  }

  render() {
    const { width, height } = this.props
    return (
        <div style={{ width: "100%", height: "100%" }}
             ref={(c) => this.container = c}
             onMouseOver={() => {
                 this.setState({isHovering: true})
             }}
             onMouseOut={() => {
                 this.setState({isHovering: false})
             }}>

            <canvas width={width} height={height}
                    ref={(c) => this.canvas = c}/>

            { this.state.currentNode &&
                <div style={{
                    ...currentNodeStyle,
                    top: this.state.tooltipY + 20,
                    left: this.state.tooltipX + 20
                }}> 
                    { this.state.currentNode.id } 
                </div>
            }
            
        </div>
    );
  }
}

Networgly.propTypes = {
    /**
     * Width of the canvas element
     */
    width: PropTypes.number,
    
    /**
     * Height of the canvas element
     */
    height: PropTypes.number,
    
    /**
     * List of edges of your graph
     */
    edges: PropTypes.array,
    
    /**
     * List of nodes
     */
    nodes: PropTypes.array,
    
    /**
     * Callback for mouse hover event. 
     */
    onNodeHover: PropTypes.func,
    
    /**
     * Callback for drag/zoom event. 
     */
    onDrag: PropTypes.func,

    /**
     * Object defining current position (x,y)
     * and scale of the visualization. 
     */
    transform: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        scale: PropTypes.number.isRequired
    })
}
