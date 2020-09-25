export const scaleRange = [0.15, 3];
export const scaleLevel = 5;
export const nodeSize = [38, 10];
export const nodeSeparation = 1.6;
export const autoAdjust = true;
export const padding = {
  h: 6,
  v: 6
};
export const defaultScale = 1.16666667;
export const fadeDuration = 400;
export const gap = 60;
export const duration = 300;
export function createSettings0(t) {
  return {
    isLeft: t,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    maxSliblings: 0,
    textSize: {
      width: 0,
      height: 0
    },
    topLeft: {
      x: 0,
      y: 0
    },
    topCenter: {
      x: 0,
      y: 0
    },
    topRight: {
      x: 0,
      y: 0
    },
    rightCenter: {
      x: 0,
      y: 0
    },
    bottomRight: {
      x: 0,
      y: 0
    },
    bottomCenter: {
      x: 0,
      y: 0
    },
    bottomLeft: {
      x: 0,
      y: 0
    },
    leftCenter: {
      x: 0,
      y: 0
    },
    pointsForLinkIn: [{
      x: 0,
      y: 0
    }, {
      x: 0,
      y: 0
    }, {
      x: 0,
      y: 0
    }, {
      x: 0,
      y: 0
    }, {
      x: 0,
      y: 0
    }]
  }
}

export function isCompanyNode(t) {
  return t.type === "Company";
}

export function isGroupNode(t) {
  return t.type === "Group";
}

export function isDataNode(t) {
  return isCompanyNode(t) || isGroupNode(t);
}

export function isLabelNode(t) {
  return t.type === "Label";
}

export function isPersonNode(t) {
  return t.type === "Nature";
}

export function isMoreNode(t) {
  return t.type === "More";
}

export function isSignalNode(t) {
  return t.type === "Signal";
}

export function isOtherNode(t) {
  return t.type === 'Other';
}
// 生成富文本对象
export function prepareNameList(t) {
  isLabelNode(t) ? function (t) {
    t.richNames = [],
      t.richNames.push({
        text: t.name,
        props: {}
      })
  }(t) : isCompanyNode(t) ? function (t) {
    // 公司节点标记股权比例等信息
    t.richNames = [];
    var name = t.name, rate = t.rate, amount = t.amount, salesRatio = t.salesRatio, purchaseRatio = t.purchaseRatio, num = t.num, title = t.title;
    name && t.richNames.push({
      text: name,
      props: {
        fill: "#333"
      }
    });
    if (name.length > 40) {
      name = name.substr(0, 40) + "...";
    }
    // 股权比例
    rate && (t.richNames.push({
      text: " [",
      props: {
        fill: "#999"
      }
    }),
      t.richNames.push({
        text: rate,
        props: {
          fill: "#3A6DE6"
        }
      }),
      t.richNames.push({
        text: "]",
        props: {
          fill: "#999"
        }
      }));
    // 担保金额
    if (amount) {
      t.richNames.push({
        text: "[",
        props: {
          fill: "#999"
        }
      });
      t.richNames.push({
        text: amount,
        props: {
          fill: "#3A6DE6"
        }
      });
      t.richNames.push({
        text: "]",
        props: {
          fill: "#999"
        }
      });
    }
    // 采购占比
    if (salesRatio) {
      t.richNames.push({
        text: "[",
        props: {
          fill: "#999"
        }
      });
      t.richNames.push({
        text: salesRatio,
        props: {
          fill: "#3A6DE6"
        }
      });
      t.richNames.push({
        text: "]",
        props: {
          fill: "#999"
        }
      });
    }
    // 采购占比
    if (purchaseRatio) {
      t.richNames.push({
        text: "[",
        props: {
          fill: "#999"
        }
      });
      t.richNames.push({
        text: purchaseRatio,
        props: {
          fill: "#3A6DE6"
        }
      });
      t.richNames.push({
        text: "]",
        props: {
          fill: "#999"
        }
      });
    }
    // 多次共投
    if (num) {
      t.richNames.push({
        text: " [",
        props: {
          fill: "#999"
        }
      });
      t.richNames.push({
        text: num,
        props: {
          fill: "#3A6DE6"
        }
      });
      t.richNames.push({
        text: "]",
        props: {
          fill: "#999"
        }
      });
    }
    // 疑似关系
    if (title) {
      t.richNames.push({
        text: " [",
        props: {
          fill: "#999"
        }
      });
      t.richNames.push({
        text: title,
        props: {
          fill: "#3A6DE6"
        }
      });
      t.richNames.push({
        text: "]",
        props: {
          fill: "#999"
        }
      });
    }
  }(t) : isGroupNode(t) ? function (t) {
    t.richNames = [{
      text: t.name
    }]
  }(t) : isPersonNode(t) ? function (t) {
    t.richNames = [];
    var name = t.name, rate = t.rate;
    name && t.richNames.push({
      text: name,
      props: {
        fill: "#333"
      }
    });
    rate && (t.richNames.push({
      text: " [",
      props: {
        fill: "#999"
      }
    }),
      t.richNames.push({
        text: rate,
        props: {
          fill: "#3A6DE6"
        }
      }),
      t.richNames.push({
        text: "]",
        props: {
          fill: "#999"
        }
      }));
  }(t) : isOtherNode(t) ? function (t) {
    t.richNames = [];
    var name = t.name, rate = t.rate;
    name && t.richNames.push({
      text: name,
    });
    rate && (t.richNames.push({
      text: " [",
      props: {
        fill: "#fff"
      }
    }),
      t.richNames.push({
        text: rate,
        props: {
          fill: "#fff"
        }
      }),
      t.richNames.push({
        text: "]",
        props: {
          fill: "#fff"
        }
      }));
  }(t) : isMoreNode(t) && function (t) {
    t.richNames = [{
      text: t.name, props: {}
    }]
  }(t)
}

export function plusIsOpen(t) {
  return t.children;
}

const defaultNodeSettings = {
  cursor: "pointer",
  fontSize: 12,
  fontWeight: "normal",
  textColor: "#fff",
  borderColor: "#128BED",
  bgColor: "#128BED",
  borderWidth: .5,
  fillOpacity: 1,
  borderOpacity: 1,
  radius: 2,
  plusEnabled: !0,
  plusBorderColor: "#666",
  plusBorderColor2: "#999",
  plusLineColor: "#666",
  plusLineWidth: 1,
  plusBorderWidth: 1,
  plusR: 6,
  plusEnableBlink: !1,
  arrowInOrOut: "in"
};

export const nodeSettings = {
  Default: defaultNodeSettings,
  Label: {
    ...defaultNodeSettings,
    cursor: "default",
    bgColor: "#E3EEFF",
    borderColor: "#E3EEFF",
    textColor: "#2C2C2C"
  },
  Nature: {
    ...defaultNodeSettings,
    cursor: "default",
    bgColor: "#FFF",
    borderColor: "#E8E8E8",
    textColor: "#666"
  },
  Company: {
    ...defaultNodeSettings,
    bgColor: "#FFF",
    borderColor: "#E8E8E8",
    textColor: "#666",
    activeBorderColor: "#3A6DE6"
  },
  Group: {
    ...defaultNodeSettings,
    bgColor: "#FFF",
    borderColor: "#E8E8E8",
    textColor: "#666",
    activeBorderColor: "#3A6DE6"
  },
  More: {
    ...defaultNodeSettings,
    bgColor: "#FFF",
    borderColor: "#E8E8E8",
    textColor: "#F9AD14"
  },
  Signal: {
    ...defaultNodeSettings,
    bgColor: "#FFF",
    borderColor: "#000",
    textColor: "#333"
  }
}

export const defaultLineSettings = {
  lineWidth: .5,
  lineColor: "#CCC",
  lineFill: "none",
  lineOpacity: .9,
  enableFlowAnimation: !0,
  flowLineColor: "#999",
  flowLineOpacity: 1,
  type: "horizontalPolyline"
}
