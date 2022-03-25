  <template>
  <v-app-bar flat height="60">
    <v-responsive>
      <v-row>
        <v-col v-for="n in 4" :key="n">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
            disabled
          />
        </v-col>
      </v-row>
    </v-responsive>
  </v-app-bar>
</template>