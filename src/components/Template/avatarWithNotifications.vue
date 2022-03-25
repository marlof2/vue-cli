<template>
  <v-menu bottom rounded offset-y left min-width="470px">
    <template v-slot:activator="{ on }">
      <v-btn icon x-large v-on="on" @click="loadNotifications()">
        <v-badge
          :value="notificationsCount > 0"
          :content="notificationsCount"
          color="red"
          overlap
        >
          <v-avatar color="white" size="40px">
            <span class="blue--text headline">{{ userNameInitials }}</span>
          </v-avatar>
        </v-badge>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <scroll height="280px" v-if="notificationsCount > 0">
          <v-skeleton-loader
            :loading="loading"
            transition="scale-transition"
            height="94"
            type="list-item-two-line"
          >
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <div
                  class="notification"
                  v-for="notification in this.notifications"
                  :key="notification.mensagem.replace(' ', '')"
                  @click="onClickNotification(notification)"
                >
                  <v-icon x-large :class="getCssClassFor(notification)">
                    {{
                      notification.etapa == "Rascunho"
                        ? "icon-rascunho"
                        : notification.icone
                    }}
                  </v-icon>

                  <div class="content">
                    <p :class="getCssClassFor(notification, true)">
                      {{ notification.etapa }}
                    </p>
                    <p
                      :class="
                        notification.tempo_restante < 0
                          ? 'atrasado'
                          : 'black--text'
                      "
                    >
                      {{ notification.mensagem }}
                    </p>
                  </div>
                </div>
              </div>
            </v-list-item-content>
          </v-skeleton-loader>
        </scroll>
        <p
          v-else
          style="font-size: 1.1rem;"
          class="text-right text--black ma-1 pa-3"
        >
          Sem notificações
        </p>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
import { processoMixin } from "@/mixins/processo.mixin";
import { mapGetters, mapActions } from "vuex";
import scroll from "../UI/Scroll";
import _ from "lodash";

export default {
  name: "AvatarWithNotifications",
  mixins: [processoMixin],
  components: {
    scroll
  },
  data: () => ({
    notificationsCount: 0,
    loading: false
  }),
  mounted() {
    this.loadNotifications();
  },
  methods: {
    ...mapActions({
      getNotifications: "$_auth/getNotifications"
    }),
    getCssClassFor(notification, forceDelayClass = false) {
      if (notification.tempo_restante < 0 && forceDelayClass) {
        return "atrasado";
      }

      return this.getCssClassForProcessStatus(
        notification.etapa,
        notification.situacao
      );
    },
    onClickNotification(notification) {
      if (
        !(notification.etapa === "Rascunho" && notification.tempo_restante < 0)
      ) {
        this.$router.push({
          name: "processos.edit",
          params: { id: notification.cd_processo }
        });
      }
    },
    async loadNotifications() {
      if (!this.loading) {
        this.loading = true;
        await this.getNotifications();
        this.loading = false;
      }
    }
  },
  computed: {
    ...mapGetters({
      authenticated: "$_auth/authenticated",
      notifications: "$_auth/notifications"
    }),
    userNameInitials() {
      let initials = "";
      if (_.hasIn(this.authenticated, "usuario.nm_usuario")) {
        let name = this.authenticated.usuario.nm_usuario.split(" ");
        initials = name[0].charAt(0);
        if (name.length > 1) {
          initials += name[name.length - 1].charAt(0);
        }
      }
      return initials;
    }
  },
  watch: {
    notifications(newData) {
      this.notificationsCount = newData.length;
    }
  }
};
</script>

<style lang="scss" scoped>
$vermelhoAtraso: #ea6355;

.notification {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  white-space: nowrap;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }

  p {
    margin: 1px 0;
    padding: 2px;
    text-align: left;
    font-size: 0.85rem;
  }
}

.atrasado {
  color: $vermelhoAtraso !important;
}

.v-icon {
  margin: 3px;
  padding: 10px;
}

.v-card__text {
  padding: 3px !important;
}
</style>
