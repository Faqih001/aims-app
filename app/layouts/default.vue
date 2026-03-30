<template>
  <div>
    <LayoutTopbar />
    <LayoutHeader />

    <main>
      <slot />
    </main>

    <LayoutFooter />
    <LayoutBottomBar />
  </div>
</template>
