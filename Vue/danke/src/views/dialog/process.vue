<template>
  <div class="process-state">
    <div
      v-for="(item, index) in states"
      :key="index"
      class="state-item"
      :class="'state_' + item.state"
    >
      <section style="display: flex; position: relative">
        <div class="item_time">{{ item.time }}</div>
        <div class="circle"></div>
        <section>
          <div style="display: flex">
            <div class="item_state_name">{{ item.stateName }}</div>
            <div class="item_operator">{{ item.operator }}</div>
          </div>
          <div style="display: flex; margin-top: 8px">
            <div
              v-if="index !== 0 && index !== states.length - 1"
              class="item_state"
            >
              {{ calcStatus(item.state) }}
            </div>

            <el-tooltip
              :content="item.opinion"
              effect="light"
              :disabled="item.opinion && item.opinion.length < 60"
            >
              <div class="item_opinion">{{ item.opinion }}</div>
            </el-tooltip>
          </div>
        </section>
        <div class="vertical-line" v-if="index !== states.length - 1"></div>
      </section>
    </div>
  </div>
</template>

<script>
const PROCESSSTATES = [
  { label: '申请', value: 'start' },
  { label: '同意', value: 'agree' },
  { label: '驳回', value: 'disagree' },
  { label: '待审', value: 'wait' }
]
export default {
  data() {
    return {
      states: [
        {},
        {
          time: '2023-02-02 13:22',
          stateName: '业务经理发起流程',
          operator: '张SIR 1119000',
          state: 'start',
          opinion: ''
        },
        {
          time: '2023-02-03 14:22',
          stateName: '投资银行部投资经理',
          operator: '李SIR 1119001',
          state: 'agree',
          opinion: '意见内容：无意见。'
        },
        {
          time: '2023-02-11 10:09',
          stateName: '投资银行部业务中心经理',
          operator: '李SIR 1119002',
          state: 'disagree',
          opinion:
            '意见内容：放款材料不全，请补充。如果内容很长，支持换行展示，最多显示二行，超出部分省..。'
        },
        {
          time: '2023-04-11 10:09',
          stateName: '投资银行部业务中心经理',
          operator: '李SIR 1119002',
          state: 'wait',
          opinion:
            '意见内容：放款材料不全，请补充。如果内容很长，支持换行展示，最多显示二行，超出部分省意见内容：放款材料不全，请补充。如果内容很长，支持换行展示，最多显示二行，超出部分省意见内容：放款材料不全，请补充。如果内容很长，支持换行展示，最多显示二行，超出部分省意见内容：放款材料不全，请补充。如果内容很长，支持换行展示，最多显示二行，超出部分省意见内容：放款材料不全，请补充。如果内容很长，支持换行展示，最多显示二行，超出部分省'
        },
        {}
      ]
    }
  },
  methods: {
    calcStatus(status) {
      let item = PROCESSSTATES.find(item => item.value === status)
      if (item) {
        return item.label
      }
      return ''
    }
  }
}
</script>

<style lang="less" scoped>
.process-state {
  .state-item {
    padding: 0 16px;
    height: 72px;

    &:nth-child(1) {
      height: 36px;

      .circle {
        background-color: #fff;
      }
    }

    &.state_start,
    &.state_agree {
      .item_state {
        color: #23c12f;
        background-color: #23c12f3d;
      }
    }

    &.state_disagree {
      .item_state {
        color: #fc2c22;
        background-color: #fc2c223d;
      }
    }

    &.state_wait {
      .item_state {
        color: #e98412;
        background-color: #e984123d;
      }

      .circle {
        background-image: none;
        background-color: #fff;
      }
    }

    .vertical-line {
      width: 2px;
      background-color: #c3d4fa;
      position: absolute;
      left: 143px;
      top: 2px;
      height: calc(100% + 24px);
    }

    .item_time {
      color: #999999;
      font-size: 12px;
      margin-top: 2px;
      width: 120px;
      text-align: right;
    }

    .circle {
      width: 12px;
      height: 12px;
      border: 2px solid #c3d4fa;
      border-radius: 50%;
      margin-left: 16px;
      margin-right: 15px;
      margin-top: 2px;
      z-index: 1;
      background-color: #145bd3;
      background-image: url('./down.png');
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 4px;
    }

    .item_state_name {
      font-weight: bold;
      font-size: 13px;
      margin-right: 24px;
    }

    .item_operator {
      font-size: 13px;
      color: #999999;
    }

    .item_state {
      padding: 0 8px;
      background-color: #ccc;
      margin-right: 16px;
      border-radius: 5px 5px;
      font-weight: bold;
      height: 24px;
      line-height: 24px;
    }

    .item_opinion {
      max-width: 800px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>