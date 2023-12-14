<template>
  <pro-layout-contaner :gutter="20" :flexNowrap="true">
    <div style="padding: 10px; width: 300px" class="tree-card" flex="none">
      <h3>文档树</h3>
      <pro-data-tree
        ref="tree"
        :default-expand-all="true"
        :expand-on-click-node="false"
        :dataSource="treeTableData"
        select-model="multiple"
        :show-checkbox="false"
        check-on-click-node
        :indent="6"
        class="mt10"
        nodeKey="id"
        v-bind:selectNodes.sync="selectNodes"
        @node-click="onRowClick"
      >
        <template slot="nodeContent" slot-scope="{ node }">
          <div style="position: relative; width: 180px">
            <span>{{ node.label }}</span>

            <span
              v-if="node.level === 1"
              class="all-btn"
              :class="{ checked: node.checked }"
              >全部
            </span>
          </div>
        </template>
      </pro-data-tree>
    </div>
    <div flex="auto">
      <div class="select-area">
        <div style="display: flex; padding: 10px 0; position: relative">
          <div>
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            ></el-checkbox>
            <span style="margin-left: 10px">共{{ total }}条结果</span>
          </div>
          <span style="position: absolute; right: 20px">下载</span>
        </div>
        <hr />
        <el-checkbox-group v-model="checkedList" @change="handleCheckedChange">
          <div
            v-for="item in tables"
            :key="item.id"
            style="padding: 8px; display: flex"
          >
            <div class="left" style="flex: 1">
              <el-checkbox :label="item.id" :key="item.id + 'ck'"
                >{{ '' }}</el-checkbox
              >
              <span style="font-size: 14px; color: #004098"
                >XXXXXXXXXXXXXXX产品01放款合同名称放款合同名称放款合同名称放款合同名称XXXXXXXXXXXXXXX产品01放款合同名称放款合同名称放款合同名称放款合同名称XXXXXXXXXXXXXXX产品01放款合同名称放款合同名称放款合同名称放款合同名称XXXXXXXXXXXXXXX产品01放款合同名称放款合同名称放款合同名称放款合同名称XXXXXXXXXXXXXXX产品01放款合同名称放款合同名称放款合同名称放款合同名称.pdf</span
              >
              <div style="font-size: 12px; color: #999999;padding: 2px 0;">
                <span class="sub-icon-title">
                  190000KB
                </span>
                <span class="sub-icon-title">
                  <i class="el-icon-time"></i>
                  2023/03/09
                </span>
                <span class="sub-icon-title">
                  <i class="el-icon-user"></i>
                  水果果
                </span>
                <span class="sub-icon-title">
                  <i class="el-icon-folder-opened"></i>
                  总部门/分部门
                </span>
              </div>
            </div>
            <div class="right" style="width: 130px">
              <pro-action size="mini" type="text" icon="el-icon-view" @handler="() => {}"></pro-action>
              <pro-action size="mini" type="text" icon="el-icon-download" @handler="() => {}"></pro-action>
            </div>
          </div>
        </el-checkbox-group>
      </div>
    </div>
  </pro-layout-contaner>
</template>

<script>
export default {
  data() {
    this.xx = x => {
      console.log('UI_LOG: ', x)
    }
    return {
      treeTableData: [
        {
          id: '00001',
          label: '业务种类',
          children: [
            {
              id: '00001-1',
              label: '综合管理'
            },
            {
              id: '00001-2',
              label: '任务管理'
            },
            {
              id: '00001-3',
              label: '投资业务',
              children: [
                {
                  id: '00001-3-1',
                  label: '自营投资',
                  children: [
                    {
                      id: '00001-3-1-1',
                      label: '放款管理'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: '00002',
          label: '2023年',
          children: [
            {
              id: '00002-1',
              label: '1月'
            },
            {
              id: '00002-2',
              label: '2月'
            },
            {
              id: '00002-3',
              label: '3月'
            }
          ]
        }
      ],
      tables: [
        { name: 'aaaa', id: 1 },
        { name: 'bbbb', id: 222 }
      ],
      selectNodes: [],
      total: 0,
      //新的全选效果
      isIndeterminate: false,
      checkAll: false,
      checkedList: []
    }
  },
  methods: {
    handleCheckAllChange(val) {
      let checkedList = this.tables.map(item => item.id)
      this.checkedList = val ? checkedList : []
      this.isIndeterminate = false
    },
    handleCheckedChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.tables.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.tables.length
    },
    onRowClick(row) {
      this.$nextTick(() => {
        console.log('UI_LOG: ', this.selectNodes)
      })
    }
  }
}
</script>


<style lang="less" scoped>
.tree-card {
  ::v-deep {
    .el-tree-node {
      .el-checkbox {
        display: none;
      }
      .el-tree-node__label {
        .all-btn {
          color: #fff;
          background-color: #ccc;
          padding: 2px 8px;
          border-radius: 15px;
          position: absolute;
          font-size: 12px;
          right: 0;
          &.checked {
            background-color: #004098;
          }
        }
      }

      &.is-checked {
        .el-tree-node__content {
          background-image: linear-gradient(to right, #c1dbf2, #fff);
        }
      }
    }
  }
}


.sub-icon-title {
  margin-right: 24px;
}
</style>