<template>
  <div
    class="graph-container entity-graph-tree"
    :class="{'fullscreen': fullscreen}"
    v-loading="dataLoading"
  >
  </div>
</template>

<script>
import * as d3 from "d3";
import * as graphConfig from "./entity-graph.config";
import { measureText, createRichText, createText } from "./svg-utils";
import { maxBy, extend } from "lodash";
/* import {
  entGraphTree,
  enterGraphMore,
  getEnter,
  getEntTag,
  getGroupTag,
} from "@/networks/view.api"; */
import { rect } from "@/libs/dom";
import mockData from '@/fakeData/treeData.json'
function flattenProperties(arr) {
  return arr.map(item => {
    let { children, properties, ...rest } = item;
    if (Array.isArray(children) && children.length) {
      children = flattenProperties(children);
    } else {
      children = null;
    }
    return { children, ...rest, ...properties };
  })
}
export default {
  name: "EntityGraph",
  data() {
    return {
      dataLoading: false,
      treeData: {},
      overviewDataCache: {},
      overviewData: {},
      overviewLoading: false,
      overviewVisible: false,
      tooltipPosition: {},
      tooltipData: []
    };
  },
  props: {
    fullscreen: {
      type: Boolean,
      default: false,
    },
    params: {
      type: Object,
      validator(obj) {
        return "entid" in obj;
      },
    },
  },
  components: {
  },
  methods: {
    /**
     * 初始化元素及配置
     */
    initTree() {
      var $vm = this;
      var { innerWidth, innerHeight } = rect(this.$el);
      // this.$el.removeChild(this.$el.querySelector("svg"));
      this.size = {
        width: innerWidth,
        height: innerHeight,
      };
      // 创建SVG元素
      this.svg = d3
        .select(this.$el)
        .append("svg")
        .attr("width", innerWidth)
        .attr("height", innerHeight)
        .attr("class", "tree")
        .attr("cursor", "move");
      // 所有元素的容器
      this.rootG = this.svg.append("g");
      // 缩放配置
      this.transform = {
        k: 1,
        x: 0,
        y: 0,
      };
      // 右侧树形图容器
      this.rightContainer = this.rootG
        .append("g")
        .attr(
          "transform",
          "translate(" + this.size.width / 2 + ", " + this.size.height / 2 + ")"
        );
      // 右侧树形图连线容器
      this.rightLinksContainer = this.rightContainer
        .append("g")
        .classed("links", !0);
      // 右侧树形图节点容器
      this.rightNodesContainer = this.rightContainer
        .append("g")
        .classed("nodes", !0);
      // 左侧树形图容器
      this.leftContainer = this.rootG
        .append("g")
        .attr(
          "transform",
          "translate(" + this.size.width / 2 + ", " + this.size.height / 2 + ")"
        );
      // 左侧树形图连线容器
      this.leftLinksContainer = this.leftContainer
        .append("g")
        .classed("links", !0);
      // 左侧树形图节点容器
      this.leftNodesContainer = this.leftContainer
        .append("g")
        .classed("nodes", !0);
      // 配置缩放
      var zoom = d3
        .zoom()
        .scaleExtent(graphConfig.scaleRange)
        .on("zoom", function () {
          var currentZoom = d3.zoomTransform($vm.svg.node());
          $vm.rootG.attr("transform", currentZoom);
          $vm.transform = { ...currentZoom };
        });
      // 去掉双击缩放
      this.svg.call(zoom).on("dblclick.zoom", null);
      this.zoom = zoom;
      // 布局配置
      this.tree = d3
        .tree()
        .nodeSize(graphConfig.nodeSize)
        .separation(function (t, e) {
          return t.parent === e.parent ? 1 : graphConfig.nodeSeparation;
        });
    },
    updateTree(isLeft, target) {
      var $vm = this;
      var root = d3.hierarchy(
        isLeft ? this.treeData.left : this.treeData.right
      );
      var nodesContainer = isLeft
        ? this.leftNodesContainer
        : this.rightNodesContainer;
      var linksContainer = isLeft
        ? this.leftLinksContainer
        : this.rightLinksContainer;
      if (!target) {
        target = root;
      }
      // 待修改：遍历节点生成默认配置
      root.eachBefore(function (d) {
        d.data.settings0 = graphConfig.createSettings0();
      });
      // 生成树形图布局
      this.tree(root);
      // 节点
      var nodes = root.descendants();
      var links = root.links();
      // 处理节点数据
      this.prepareNodes(nodes, isLeft);
      // 处理连线数据
      this.prepareLinks(links, isLeft);

      var nodeSelectiton = nodesContainer
        .selectAll("g.node")
        .data(nodes, function (d) {
          return d.id;
        });
      var enterNodes = nodeSelectiton
        .enter()
        .append("g")
        .classed("node", !0)
        .attr("cursor", function (t) {
          return t.data.settings.cursor;
        })
        .attr("transform", function (n) {
          // return `translate(${n.data.settings.x},${n.data.settings.y})`;
          return graphConfig.isMoreNode(n.data)
            ? isLeft
              ? "translate(" +
                (root.data.settings0.x +
                  root.data.settings0.width / 2 -
                  n.data.settings.width / 2) +
                "," +
                root.data.settings0.y +
                ")"
              : "translate(" +
                (root.data.settings0.rightCenter.x +
                  n.data.settings.width / 2 -
                  root.data.settings0.width) +
                "," +
                root.data.settings0.rightCenter.y +
                ")"
            : 0 === n.depth && n === root
            ? "translate(0,0)"
            : 0 === root.depth
            ? isLeft
              ? "translate(" +
                (root.data.settings.leftCenter.x - n.data.settings.width / 2) +
                "," +
                root.data.settings.leftCenter.y +
                ")"
              : "translate(" +
                (root.data.settings.rightCenter.x + n.data.settings.width / 2) +
                "," +
                root.data.settings.rightCenter.y +
                ")"
            : isLeft
            ? "translate(" +
              (root.data.settings0.x -
                root.data.settings0.width / 2 -
                n.data.settings.width / 2) +
              "," +
              root.data.settings0.y +
              ")"
            : "translate(" +
              (root.data.settings0.rightCenter.x + n.data.settings.width / 2) +
              "," +
              root.data.settings0.rightCenter.y +
              ")";
        })
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("click", function (d) {
          // 展示信息框
          if (graphConfig.isDataNode(d.data)) {
            $vm.handleNodeInfo(d.data);
          }
          // 同级更多节点
          if (graphConfig.isMoreNode(d.data)) {
            $vm.handleMore(d, isLeft);
          }
        });

      enterNodes
        .append("rect")
        .attr("fill", function (e) {
          return isLeft || 0 !== e.depth
            ? e.data.settings.bgColor
            : "rgba(255, 255, 255, 0)";
        })
        .attr("fill-opacity", function (t) {
          return t.data.settings.fillOpacity;
        })
        .attr("stroke", function (d) {
          return isLeft || 0 !== d.data.settings.depth
            ? d.data.settings.borderColor
            : "#fff";
        })
        .attr("stroke-width", function (d) {
          return isLeft || 0 !== d.data.settings.depth
            ? d.data.settings.borderColor
            : "#fff";
        })
        .attr("width", function (t) {
          return t.data.settings.width;
        })
        .attr("height", function (t) {
          return t.data.settings.height;
        })
        .attr("x", function (t) {
          return -t.data.settings.width / 2;
        })
        .attr("y", function (t) {
          return -t.data.settings.height / 2;
        })
        .attr("rx", function (t) {
          return t.data.settings.radius;
        })
        .attr("ry", function (t) {
          return t.data.settings.radius;
        });
      enterNodes
        .append(function (t) {
          return createRichText(t.data);
        })
        .style("fill", function (t) {
          return t.data.settings.textColor;
        })
        .attr("x", function (e) {
          return isLeft
            ? (e.data.settings.width - e.data.settings.textSize.width) / 2 -
                graphConfig.padding.h
            : -(
                (e.data.settings.width - e.data.settings.textSize.width) / 2 -
                graphConfig.padding.h
              );
        })
        .attr("y", function (t) {
          return 2;
          // return v.deviceInfo.isSafari() ? 4 : 2;
        });

      // 用于遮盖文字
      enterNodes
        .append("rect")
        .attr("fill", "transparent")
        .attr("stroke", "none")
        .attr("stroke-width", 0)
        .attr("width", function (t) {
          return t.data.settings.width;
        })
        .attr("height", function (t) {
          return t.data.settings.height;
        })
        .attr("x", function (t) {
          return -t.data.settings.width / 2;
        })
        .attr("y", function (t) {
          return -t.data.settings.height / 2;
        })
        .on("mouseenter", function(d){
          if(d.parent && d.parent.data.tag === "SameInvest"){
            clearTimeout($vm.tooltipTimer);
            $vm.handleTooltips(d.data);
          }
        })
        .on("mouseout", function(d){
          $vm.tooltipTimer = setTimeout(function(){
            $vm.tooltipPosition = {display: "none"};
            $vm.tooltipData = [];
          }, 400);
        })

/*
       * 绘制箭头
       * @param  {string} markerUnits [设置为strokeWidth箭头会随着线的粗细发生变化]
       * @param {string} viewBox 坐标系的区域
       * @param {number} markerWidth,markerHeight 标识的大小
       * @param {string} orient 绘制方向，可设定为：auto（自动确认方向）和 角度值
       * @param {number} stroke-width 箭头宽度
       * @param {string} d 箭头的路径
       * @param {string} fill 箭头颜色
       * @param {string} id resolved0表示公司 resolved1表示个人
       * 直接用一个marker达不到两种颜色都展示的效果
       */
      enterNodes
        .append('marker')
        .attr('id', d => {
          let r = d.data.id
          return (r || 'resolved') + 'resolved'
        })
        .attr('markerUnits', 'strokeWidth')
        .attr('markerUnits', 'userSpaceOnUse')
        .attr('viewBox', '0 -5 10 10')
        .attr('markerWidth', 12)
        .attr('markerHeight', 12)
        .attr('orient', 'auto')
        .attr('refX', 10)
        .attr('stroke-width', 2)
        .attr('fill', 'red')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#FD7D00')
      var nodePlus = enterNodes
        .append("g")
        .classed("plus-circle", !0)
        .attr("transform", function (e) {
          return (
            "translate(" +
            (isLeft
              ? -e.data.settings.width / 2 +
                graphConfig.padding.h +
                graphConfig.padding.h
              : e.data.settings.width / 2 -
                graphConfig.padding.h -
                graphConfig.padding.h) +
            "," +
            e.data.settings.plusBorderWidth +
            ")"
          );
        })
        .attr("visibility", function (t) {
          return 0 !== t.depth && t.data.settings.plusEnabled ? "" : "hidden";
        })
        .on("click", function (d) {
          // 阻止事件冒泡
          d3.event.stopPropagation();
          if (0 !== d.depth) {
            // 公司节点可扩展
            if (graphConfig.isDataNode(d.data)) {
              // 集团节点可展开收起
              if (graphConfig.isGroupNode(d.data)) {
                d.data.isLoaded = !0;
              }
              d.data.isLoaded
                ? (d.data._children
                    ? ((d.data.children = d.data._children),
                      (d.data._children = null))
                    : ((d.data._children = d.data.children),
                      (d.data.children = null)),
                  $vm.handleStretch(d, isLeft))
                : $vm.handleNext(d, isLeft);
            }
          }
        });
      nodePlus
        .append("circle")
        .classed("plus", !0)
        .attr("r", function (t) {
          return t.data.settings.plusR;
        })
        .classed("blink", function (t) {
          return t.data.settings.plusEnableBlink;
        })
        .style("stroke", function (t) {
          return graphConfig.plusIsOpen(t)
            ? t.data.settings.plusBorderColor2
            : t.data.settings.plusLineColor;
        })
        .style("fill", function (t) {
          return t.data.settings.bgColor;
        })
        .style("stroke-width", function (t) {
          return t.data.settings.plusBorderWidth;
        });
      nodePlus
        .append("line")
        .classed("plus", !0)
        .style("stroke", function (t) {
          return graphConfig.plusIsOpen(t)
            ? t.data.settings.plusBorderColor2
            : t.data.settings.plusLineColor;
        })
        .style("stroke-width", function (t) {
          return t.data.settings.plusLineWidth;
        })
        .attr("x1", function (t) {
          return 3 - t.data.settings.plusR;
        })
        .attr("y1", 0)
        .attr("x2", function (t) {
          return t.data.settings.plusR - 3;
        })
        .attr("y2", 0);
      nodePlus
        .append("line")
        .classed("plus", !0)
        .classed("vertical-line", !0)
        .style("stroke", function (t) {
          return graphConfig.plusIsOpen(t)
            ? t.data.settings.plusBorderColor2
            : t.data.settings.plusLineColor;
        })
        .style("stroke-width", function (t) {
          return t.data.settings.plusLineWidth;
        })
        .attr("x1", 0)
        .attr("y1", function (t) {
          return 3 - t.data.settings.plusR;
        })
        .attr("x2", 0)
        .attr("y2", function (t) {
          return t.data.settings.plusR - 3;
        })
        .attr("visibility", function (t) {
          return graphConfig.plusIsOpen(t) ? "hidden" : "";
        });

      var updateNodes = nodeSelectiton
        .merge(enterNodes)
        .transition()
        .duration(graphConfig.duration)
        .ease(d3.easeQuad)
        .attr("transform", function (t) {
          return (
            "translate(" + t.data.settings.x + "," + t.data.settings.y + ")"
          );
        })
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

      updateNodes.select(".plus-circle").attr("visibility", function (t) {
        return 0 !== t.depth && t.data.settings.plusEnabled ? "" : "hidden";
      });
      updateNodes.select(".vertical-line").attr("visibility", function (t) {
        return graphConfig.plusIsOpen(t) ? "hidden" : "";
      });
      updateNodes.selectAll(".plus").style("stroke", function (t) {
        return graphConfig.plusIsOpen(t)
          ? t.data.settings.plusBorderColor2
          : t.data.settings.plusLineColor;
      });
      nodeSelectiton
        .exit()
        .transition()
        .duration(graphConfig.duration)
        .ease(d3.easeQuad)
        .attr("transform", function (n) {
          return false
            ? isLeft
              ? "translate(" +
                (target.data.settings.x +
                  target.data.settings.width / 2 -
                  n.data.settings.width / 2) +
                "," +
                target.data.settings.y +
                ")"
              : "translate(" +
                (target.data.settings.x -
                  target.data.settings.width / 2 +
                  n.data.settings.width / 2) +
                "," +
                target.data.settings.rightCenter.y +
                ")"
            : isLeft
            ? "translate(" +
              (target.data.settings.x -
                target.data.settings.width / 2 -
                n.data.settings.width / 2) +
              "," +
              target.data.settings.y +
              ")"
            : "translate(" +
              (target.data.settings.x +
                target.data.settings.width / 2 +
                n.data.settings.width / 2) +
              "," +
              target.data.settings.rightCenter.y +
              ")";
        })
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .remove();

      // 绘制连线
      var linkSelection = linksContainer
        .selectAll("path.link")
        .data(links, function (d) {
          return (
            d.source.data.id.substr(0, 16) +
            "-&-" +
            d.target.data.id.substr(0, 16)
          );
        });
      var enterLinks = linkSelection
        .enter()
        .append("path")
        .classed("link", !0)
        .attr('marker-end', d => `url(#${d.target.data.id}resolved)`)
        .attr("link-flow-animation-id", function (t) {
          if (
            !graphConfig.isMoreNode(t.source.data) &&
            !graphConfig.isMoreNode(t.target.data)
          ) {
            if (graphConfig.isLabelNode(t.source.data)) return t.source.data.id;
            if (graphConfig.isLabelNode(t.target.data)) return t.target.data.id;
          }
          return null;
        })
        .attr("link-flow-style", function (e) {
          if (
            !graphConfig.isMoreNode(e.source.data) &&
            !graphConfig.isMoreNode(e.target.data)
          ) {
            // if (s.default.isLinkFlowInEnabled(t, e)) return isLeft ? "out" : "in";
            // if (s.default.isLinkFlowOutEnabled(t, e)) return isLeft ? "in" : "out";
            // 标记流动方向
          }
          return null;
        })
        .attr("fill", function (t) {
          return t.lineFill;
        })
        .attr("stroke", function (t) {
          return t.lineColor;
        })
        .attr("stroke-opacity", function (t) {
          return t.lineOpacity;
        })
        .attr("stroke-width", function (t) {
          return t.lineWidth;
        })
        .attr("d", function (n) {
          return isLeft
            ? createPath([
                root.data.settings.leftCenter,
                root.data.settings.leftCenter,
                root.data.settings.leftCenter,
                root.data.settings.leftCenter,
                root.data.settings.leftCenter,
              ])
            : createPath([
                root.data.settings.rightCenter,
                root.data.settings.rightCenter,
                root.data.settings.rightCenter,
                root.data.settings.rightCenter,
                root.data.settings.rightCenter,
              ]);
        });

      linkSelection
        .merge(enterLinks)
        .transition()
        .duration(graphConfig.duration)
        .ease(d3.easeQuad)
        .attr("d", function (t) {
          return createPath(t.target.data.settings.pointsForLinkIn);
        });
      linkSelection
        .exit()
        .transition()
        .duration(graphConfig.duration)
        .ease(d3.easeQuad)
        .remove()
        .attr("d", function (n) {
          return isLeft
            ? createPath([
                target.data.settings.leftCenter,
                target.data.settings.leftCenter,
                target.data.settings.leftCenter,
                target.data.settings.leftCenter,
                target.data.settings.leftCenter,
              ])
            : createPath([
                target.data.settings.rightCenter,
                target.data.settings.rightCenter,
                target.data.settings.rightCenter,
                target.data.settings.rightCenter,
                target.data.settings.rightCenter,
              ]);
        });
      // 缩放调整
      target && this.autoAdjust(target);
      // 保存位置
      this.saveState(nodes);

      // 画连线
      function createPath(points) {
        let path = d3.path();
        let [a, b, c, d, e] = points;
        path.moveTo(a.x, a.y);
        // path.moveTo(b.x, b.y);
        path.lineTo(c.x, c.y);
        path.lineTo(d.x, d.y);
        path.lineTo(e.x, e.y);
        return path;
      }
    },
    prepareNodes(nodes, isLeft) {
      nodes.forEach((node) => {
        var settings =
          graphConfig.nodeSettings[node.data.type] ||
          graphConfig.nodeSettings.Default;

        node.data.settings = {
          ...settings,
          depth: node.depth,
          isLeft: isLeft,
          plusEnabled: node.data.entid && graphConfig.isDataNode(node.data),
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          maxSlibling: 0,
          textSize: {
            width: 0,
            height: 0,
          },
        };

        // 生成富文本配置
        graphConfig.prepareNameList(node.data);
        // 根节点特殊样式
        if (node.depth === 0) {
          node.data.settings.plusEnabled = !1;
          node.data.settings.bgColor = "#3A6DE6";
          node.data.settings.textColor = "#FFF";
          node.data.settings.fontWeight = "bold";
          node.data.richNames = null;
        }
        // 计算文本尺寸 通过可重复的标识符优化文本尺寸计算频次
        let identifier = graphConfig.isGroupNode(node.data)
          ? "entid"
          : graphConfig.isLabelNode(node.data)
          ? "tag"
          : "id";
        node.data.settings.textSize = measureText(node.data, identifier);
        // 处理坐标位置
        var X = node.x,
          Y = node.y;
        node.x = isLeft ? -Y : Y;
        node.y = node.data.settings.y = X;

        if (node.depth === 0) {
          node.x = isLeft
            ? -node.data.settings.width / 2
            : node.data.settings.width / 2;
        }
        // 节点宽度
        node.data.settings.width =
          node.data.settings.textSize.width + 2 * graphConfig.padding.h;
        if (node.depth !== 0 && node.data.settings.plusEnabled) {
          node.data.settings.width +=
            2 * node.data.settings.plusR + graphConfig.padding.h;
        }
        // 节点高度
        node.data.settings.height =
          node.data.settings.textSize.height + 2 * graphConfig.padding.v;
      });
      let maxDepth = maxBy(nodes, "depth").depth;
      let defaultDistance =
        nodes.find((item) => item.depth === 0).data.settings.width / 2 +
        graphConfig.gap;
      let handler = function (k) {
        let sameLevelNodes = nodes.filter((d) => d.depth === k);
        let maxWidth = maxBy(sameLevelNodes, function (d) {
          return d.data.settings.width;
        }).data.settings.width;
        sameLevelNodes.forEach(function (d) {
          d.x = d.data.settings.x = isLeft
            ? -defaultDistance +
              (maxWidth - d.data.settings.width) / 2 -
              maxWidth / 2
            : defaultDistance -
              (maxWidth - d.data.settings.width) / 2 +
              maxWidth / 2;
          // 保存相同层级节点的最大宽度
          d.data.settings.maxSlibling = maxWidth;
        });
        defaultDistance += graphConfig.gap + maxWidth;
      };
      for (let k = 1; k <= maxDepth; k++) {
        handler(k);
      }
      nodes.forEach(function (d) {
        var halfW = d.data.settings.width / 2;
        d.data.settings.rightCenter = {
          x: d.data.settings.x + halfW,
          y: d.data.settings.y,
        };
        d.data.settings.leftCenter = {
          x: d.data.settings.x - halfW,
          y: d.data.settings.y,
        };
      });
    },
    prepareLinks(links, isLeft) {
      links.forEach(function (d) {
        /**
         * e 起点
         * n
         * r 拐点1
         * i 拐点2
         * a 终点
         */
        var e, n, r, i, a;
        extend(d, graphConfig.defaultLineSettings);
        d.target.data.settings.isLeft
          ? ((e = {
              x: d.source.data.settings.leftCenter.x,
              y: d.source.data.settings.leftCenter.y,
            }),
            (a = {
              x:
                d.source === d.target
                  ? d.source.data.settings.leftCenter.x
                  : d.target.data.settings.rightCenter.x,
              y:
                d.source === d.target
                  ? d.source.data.settings.leftCenter.y
                  : d.target.data.settings.rightCenter.y,
            }),
            0 === d.source.depth
              ? ((n = {
                  x:
                    (d.source.data.settings.leftCenter.x +
                      d.target.data.settings.rightCenter.x) /
                    2,
                  y: d.source.data.settings.leftCenter.y,
                }),
                (r = {
                  x:
                    (d.source.data.settings.leftCenter.x +
                      d.target.data.settings.rightCenter.x) /
                    2,
                  y: d.source.data.settings.leftCenter.y,
                }),
                (i = {
                  x:
                    (d.target.data.settings.rightCenter.x +
                      d.source.data.settings.leftCenter.x) /
                    2,
                  y: d.target.data.settings.rightCenter.y,
                }))
              : ((n = {
                  x:
                    d.source.data.settings.leftCenter.x -
                    (d.source.data.settings.maxSlibling -
                      d.source.data.settings.width),
                  y: d.source.data.settings.leftCenter.y,
                }),
                (r = {
                  x:
                    d.source.data.settings.leftCenter.x -
                    (d.source.data.settings.maxSlibling -
                      d.source.data.settings.width) -
                    graphConfig.gap / 2,
                  y: d.source.data.settings.leftCenter.y,
                }),
                (i = {
                  x:
                    d.source.data.settings.leftCenter.x -
                    (d.source.data.settings.maxSlibling -
                      d.source.data.settings.width) -
                    graphConfig.gap / 2,
                  y: d.target.data.settings.rightCenter.y,
                })))
          : ((e = {
              x: d.source.data.settings.rightCenter.x,
              y: d.source.data.settings.rightCenter.y,
            }),
            (a = {
              x:
                d.source === d.target
                  ? d.source.data.settings.rightCenter.x
                  : d.target.data.settings.leftCenter.x,
              y:
                d.source === d.target
                  ? d.source.data.settings.rightCenter.y
                  : d.target.data.settings.leftCenter.y,
            }),
            0 === d.source.data.settings.depth
              ? ((n = {
                  x: d.source.data.settings.rightCenter.x,
                  y: d.source.data.settings.rightCenter.y,
                }),
                (r = {
                  x:
                    d.source.data.settings.rightCenter.x +
                    (d.target.data.settings.leftCenter.x -
                      d.source.data.settings.rightCenter.x) /
                      2,
                  y: d.source.data.settings.leftCenter.y,
                }),
                (i = {
                  x:
                    d.source.data.settings.rightCenter.x +
                    (d.target.data.settings.leftCenter.x -
                      d.source.data.settings.rightCenter.x) /
                      2,
                  y: d.target.data.settings.rightCenter.y,
                }))
              : ((n = {
                  x:
                    d.source.data.settings.rightCenter.x +
                    (d.source.data.settings.maxSlibling -
                      d.source.data.settings.width),
                  y: d.source.data.settings.leftCenter.y,
                }),
                (r = {
                  x:
                    d.source.data.settings.rightCenter.x +
                    (d.source.data.settings.maxSlibling -
                      d.source.data.settings.width) +
                    graphConfig.gap / 2,
                  y: d.source.data.settings.leftCenter.y,
                }),
                (i = {
                  x:
                    d.source.data.settings.rightCenter.x +
                    (d.source.data.settings.maxSlibling -
                      d.source.data.settings.width) +
                    graphConfig.gap / 2,
                  y: d.target.data.settings.rightCenter.y,
                })));
        d.target.data.settings.pointsForLinkIn = [e, n, r, i, a];
      });
    },
    autoAdjust(target) {
      if (graphConfig.autoAdjust && !graphConfig.isMoreNode(target.data)) {
        var n = target.data.settings.x;
        var r = target.data.settings.y;
        target.data._children &&
          (graphConfig.isDataNode(target.data) &&
            ((n = target.parent.parent.data.settings.x),
            (r = target.parent.parent.data.settings.y)),
          graphConfig.isMoreNode(target.data) &&
            ((n = target.parent.data.settings.x),
            (r = target.parent.data.settings.y)));
        var currentZoom = d3.zoomTransform(this.svg.node());
        var k = currentZoom.k;
        var l = -n * k + (this.size.width / 2 - (this.size.width / 2) * k);
        var c = -r * k + (this.size.height / 2 - (this.size.height / 2) * k);
        this.applyTransform(currentZoom, [l, c, k]);
      }
    },
    applyTransform(t, r) {
      var n = this,
        o = r[0],
        a = r[1],
        s = r[2],
        u = t.x,
        l = t.y,
        c = t.k;
      this.rootG
        .transition()
        .duration(600)
        .attrTween("transform", function () {
          var interpolate = d3.interpolate([u, l, c], [o, a, s]);
          return function (r) {
            var i = interpolate(r);
            return (t.x = i[0]), (t.y = i[1]), (t.k = i[2]), t;
          };
        })
        .on("end", function () {
          n.zoom.transform(n.rootG, t);
          n.transform = { ...t };
        });
    },
    saveState(t) {
      t.forEach(function (t) {
        t.data.settings0 = JSON.parse(JSON.stringify(t.data.settings));
      });
    },
    splitTreeData: function (t) {
      for (
        var e = {
            left: {
              id: t.id,
              entid: t.entid,
              type: t.type,
              name: t.name,
              children: [],
            },
            right: {
              id: t.id,
              entid: t.entid,
              type: t.type,
              name: t.name,
              children: [],
            },
          },
          n = Math.ceil(t.children.length / 2),
          r = 0;
        r < t.children.length;
        ++r
      )
        r < n
          ? e.right.children.push(t.children[r])
          : e.left.children.push(t.children[r]);
      return e;
    },
    renderGraph() {
      this.updateTree(!0);
      this.updateTree(!1);
    },
    // 收起展开
    handleStretch(target, isLeft) {
      // console.log("收起展开", "isLeft:", isLeft);
      this.$nextTick(() => {
        this.updateTree(isLeft, target);
      });
    },
    // 展开同级更多节点
    handleMore(target, isLeft) {
      // console.log("同级更多", "isLeft:", isLeft);
      let labelType = target.parent.data.tag;
      let currentSize = target.parent.data.children.length - 1;
      let entid = target.parent.parent.data.entid;
      this.dataLoading = true;
      enterGraphMore({ type: labelType, size: currentSize + 10, entid })
        .then((data) => {
          if (Array.isArray(data) && data.length) {
            target.parent.data.children.pop();
            Array.prototype.push.apply(
              target.parent.data.children,
              data.slice(currentSize)
            );
            this.$nextTick(() => {
              this.updateTree(isLeft, target);
            });
          }
        })
        .catch((err) => {
          alert((err && err.data && err.data.message) || "未知错误");
        })
        .finally(() => {
          this.dataLoading = false;
        });
    },
    // 某个企业节点展开同样结构
    handleNext(target, isLeft) {
      // console.log("公司展开", "isLeft:", isLeft);
      this.dataLoading = true;
      /* entGraphTree({ ...this.params, entid: target.data.entid })
        .then((data) => {
          if (Array.isArray(data.children) && data.children.length) {
            target.data.children = data.children;
            target.data.isLoaded = !0;
            this.$nextTick(() => {
              this.updateTree(isLeft, target);
            });
          }
        })
        .catch((err) => {
          alert((err && err.data && err.data.message) || "未知错误");
        })
        .finally(() => {
          this.dataLoading = false;
        }); */
    },
    // 展示节点信息
    handleNodeInfo(data) {
      if(!data.entid) return;
      this.overviewVisible = true;
      if (
        this.overviewDataCache[data.entid] &&
        this.overviewDataCache[data.entid].loaded
      ) {
        return (this.overviewData = this.overviewDataCache[data.entid]);
      }
      if (data.type === "Company") {
        this.loadCompanyNodeData(data);
      }
      if (data.type === "Group") {
        this.loadGroupNodeData(data);
      }
    },
    loadCompanyNodeData(item) {
      // console.log("loadCompanyNodeData");
      let { entid, type } = item;
      this.overviewLoading = true;
      Promise.allSettled([getEnter({ entid }), getEntTag({ entid })])
        .then((res) => {
          let temp = {};
          let fulfilled = true;
          res.forEach((d, i) => {
            if (d.status === "fulfilled") {
              if (i === 0) {
                let { id, ...rest } = d.value;
                id = null;
                temp = rest;
              }
              if (i === 1) {
                temp.tagList = d.value;
              }
            } else {
              fulfilled = false;
              console.error("rejected", d);
            }
          });
          temp.type = type;
          temp.loaded = fulfilled;
          this.overviewData = temp;
          if (fulfilled) {
            this.overviewDataCache[entid] = temp;
          }
        })
        .finally(() => {
          this.overviewLoading = false;
        });
    },
    loadGroupNodeData(item) {
      // console.log("loadGroupNodeData");
      let { entid, entname, type, companyNum } = item;
      this.overviewLoading = true;
      // 获取集团标签
      getGroupTag({ groupId: entid })
        .then((data) => {
          this.overviewDataCache[entid] = {
            loaded: !0,
            type,
            entid,
            entname,
            companyNum,
            tagList: data,
          };
          this.overviewData = this.overviewDataCache[entid];
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.overviewLoading = false;
        });
    },
    handleColseOverview(time) {
      clearTimeout(this.overviewTimer);
      if (!time) {
        this.overviewVisible = false;
      } else {
        this.overviewTimer = setTimeout(() => {
          this.overviewVisible = false;
        }, time);
      }
    },
    handleEnterOverview() {
      clearTimeout(this.overviewTimer);
    },
    handleDetail() {
      if (this.overviewData && this.overviewData.entid) {
        if (this.overviewData.type === "Group") {
          this.$router.$open({
            name: "entity-detail-group",
            query: this.$route.query,
          });
        }
        if (this.overviewData.type === "Company") {
          this.$router.$open({
            name: "entity-detail-overview",
            query: {
              id: this.overviewData.entid,
              name: this.overviewData.entname,
            },
          });
        }
      }
    },
    handleResize() {
      var { innerWidth, innerHeight } = rect(this.$el);
      var svg = d3
        .select(this.$el)
        .select("svg.tree")
        .attr("width", innerWidth)
        .attr("height", innerHeight);
      this.size = {
        width: innerWidth,
        height: innerHeight,
      };
      if (this.leftContainer) {
        this.leftContainer.attr(
          "transform",
          "translate(" + this.size.width / 2 + ", " + this.size.height / 2 + ")"
        );
      }
      if (this.rightContainer) {
        this.rightContainer.attr(
          "transform",
          "translate(" + this.size.width / 2 + ", " + this.size.height / 2 + ")"
        );
      }
      this.renderGraph();
    },
    handleTooltips(data){
      let list = data.nodes.map(d => d.name);
      let { layerX, layerY } = d3.event;
      if(list.length > 10){
        list = list.slice(0, 10).concat("...");
      }
      this.tooltipData = list;
      this.tooltipPosition = {left: `${layerX}px`, top: `${layerY}px`, display: 'block'};
    },
    loadData() {
      let data = flattenProperties([mockData.data])[0]
      this.treeData = this.splitTreeData(data)
      this.$nextTick(() => {
        this.renderGraph()
      })
      // this.dataLoading = true;
      /* entGraphTree(this.params)
        .then((data) => {
          this.treeData = this.splitTreeData(data);
          this.$nextTick(() => {
            this.renderGraph();
          });
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.dataLoading = false;
        }); */
    },
  },
  mounted() {
    this.initTree();
  },
  beforeDestroy() {
    clearTimeout(this.overviewTimer);
  },
  watch: {
    fullscreen() {
      this.$nextTick(() => {
        this.handleResize();
      });
    },
    params: {
      handler() {
        this.loadData();
      },
      deep: true,
      immediate: true
    },
  },
};
</script>

<style lang="scss">
.entity-graph-tree {
  height: 480px;
  width: 1080px;
  position: relative;
  border: 1px solid #ccc;
  margin: 20px auto;
  &.fullscreen {
    height: 100%;
  }
  & > .overview-container {
    position: absolute;
    left: 0;
    top: 0;
    padding: 12px 18px;
    width: 500px;
    // min-height: 100px;
    max-height: 500px;
    background: #fff;
    overflow-y: auto;
    border-radius: 8px;
    border: 1px solid #eee;
    & > h4 {
      margin-bottom: 6px;
      font-weight: bold;
      font-size: 18px;
      color: #344360;
      overflow: hidden;
      & > span {
        cursor: pointer;
      }
      & > .el-button {
        float: right;
        padding: 0;
        font-size: 22px;
        color: #9099ab;
      }
    }
    & > .group-info {
      .group-tag {
        display: inline-block;
        padding: 1px 6px 2px;
        margin-right: 16px;
        margin-bottom: 8px;
        border: 1px solid #eee;
        border-radius: 3px;
      }
    }
    & > .company-info {
      .reg-table {
        th,
        td {
          padding: 4px 6px;
          height: 38px;
        }
        th {
          color: #2c2c2c;
          text-align: center;
        }
      }
    }
  }
  & > .entity-tooltips{
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    padding: 4px 8px;
    min-width: 150px;
    border-radius: 3px;
    background: rgba(102, 102, 102, 0.9);
    color: #fff;
    transition: all cubic-bezier(0.22, 0.61, 0.36, 1) 0.2s;
  }
}
</style>