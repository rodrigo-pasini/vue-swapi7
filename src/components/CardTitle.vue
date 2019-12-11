<template>
    <b-row class="mt-4">
        <b-card
            overlay
            :img-src=img
            :img-alt=alt
            text-variant="white"
            :title=imgtitle
            :sub-title=imgsubtitle
            style="min-width: 100%"
        >
        <b-card-text>
            {{text}}
        </b-card-text>
        </b-card>
    </b-row>
</template>

<script>
export default {
  props: [
    'img', 'alt', 'imgtitle', 'imgsubtitle', 'text',
  ],
};
</script>
