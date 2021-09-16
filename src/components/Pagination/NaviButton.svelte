<script lang="ts">
  export let disabled: boolean = false;
  export let small: boolean = false;
  export let onClick: () => void;
</script>

<div
  class="flex justify-center items-center rounded-full border-gray-400"
  class:text-xl="{small}"
  class:text-4xl="{!small}"
  class:text-gray-500="{disabled}"
  class:cursor-pointer="{!disabled}"
  class:active:text-pink-500="{!disabled}"
  on:click="{() => {
    if (disabled) return;
    onClick();
  }}"
>
  <slot />
</div>
