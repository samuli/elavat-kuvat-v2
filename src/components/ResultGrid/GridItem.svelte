<script lang="ts">
  export let placeholder: boolean = false;
</script>

<li
  class:cursor-pointer={!placeholder}
  class="px-1 mt-2 w-1/2 sm:w-1/3 md:w-1/4 h-full flex flex-col group"
>
  <slot />
</li>
