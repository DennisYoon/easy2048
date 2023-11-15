<template>
  <div id="cell" :class="cellClass" :style="cellStyle">
    {{ props.info.num }}
  </div>
</template>

<script setup lang="ts">
import { Cell } from '@/implement/2048';
import { computed } from 'vue';

  // eslint-disable-next-line no-undef
  const props = defineProps<{
    info: Cell
  }>();

  const cellClass = computed(() => "t" + props.info.num);
  const cellStyle = computed(() => {
    return {
      top: props.info.position[0] * 107 + 15 * (props.info.position[0] + 1) + "px",
      left: props.info.position[1] * 107 + 15 * (props.info.position[1] + 1) + "px",
      animationName: props.info.newDueToMerge ? "pop" : "appear"
    };
  });
</script>

<style>
  #cell {
    width: 107px;
    height: 107px;
    line-height: 107px;
    border-radius: 3px;
    text-align: center;
    font-weight: bold;
    position: absolute;
    user-select: none;
    animation-duration: .25s;
    transition: all .1s;
  }

  .t2, .t4 {
    color: #776e65;
    font-size: 55px;
  }
  .t2 {
    background-color: #eee4da;
    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0), inset 0 0 0 1px rgba(255, 255, 255, 0);
  }
  .t4 {
    background-color: #ede0c8;
    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0), inset 0 0 0 1px rgba(255, 255, 255, 0);
  }
  .t8, .t16, .t32, .t64, .t128, .t256, .t512, .t1024, .t2048, .tnext {
    color: #f9f6f2;
  }
  .t8 {
    background-color: #f2b179;
    font-size: 55px;
  }
  .t16 {
    background-color: #f59563;
    font-size: 55px;
  }
  .t32 {
    background-color: #f67c5f;
    font-size: 55px;
  }
  .t64 {
    background-color: #f65e3b;
    font-size: 55px;
  }
  .t128 {
    background-color: #edcf72;
    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.2381), inset 0 0 0 1px rgba(255, 255, 255, 0.14286);
    font-size: 45px;
  }
  .t256 {
    background-color: #edcc61;
    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.31746), inset 0 0 0 1px rgba(255, 255, 255, 0.19048);
    font-size: 45px;
  }
  .t512 {
    background-color: #edc850;
    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.39683), inset 0 0 0 1px rgba(255, 255, 255, 0.2381);
    font-size: 45px;
  }
  .t1024 {
    background-color: #edc53f;
    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.47619), inset 0 0 0 1px rgba(255, 255, 255, 0.28571);
    font-size: 35px;
  }
  .t2048 {
    background-color: #edc22e;
    box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.55556), inset 0 0 0 1px rgba(255, 255, 255, 0.33333);
    font-size: 35px;
  }
  .tnext {
    background-color: #3c3a32;
    font-size: 30px;
  }

  @keyframes appear {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes pop {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
</style>