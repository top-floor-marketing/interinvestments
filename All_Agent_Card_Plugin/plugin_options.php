<?php

class All_Agent_Card_options {

  protected $plugin_options_page = '';

  /**
  * Initialize hooks.
  */
  public function init() {

    add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ) );
    add_action( 'admin_init', array( $this, 'register_plugin_settings' ) );
    // add_action('admin_menu', array( $this, 'create_admin_menu_page' ) );
  }

  public function register_plugin_settings() {
      register_setting( 'wp-react-plugin-settings-group', 'wp-react-plugin' );
  }

  /**
  *
  * Create new plugin options page under the Settings menu.
  */
  public function create_admin_menu_page() {
    $this->plugin_options_page = add_options_page('All_Agent_Card', 'All_Agent_Card', 'manage_options', __FILE__, array( $this, 'render_plugin_options_page' ) );
  }

  public function render_plugin_options_page() {
    echo '<div id="All_Agent_Card"></div>';
  }

  public function enqueue_admin_scripts($hook) {

    // Are we on the plugin options page?
    if( $hook === $this->plugin_options_page ) {

      // add react and react-dom from core
      $dep = ['wp-element'];
      //$dep = ['react', 'react-dom']; // alternative way of loading React via WP core

      $handle = 'wp-react-plugin-All_Agent_Card';

      // enqueue development or production React code
      if(file_exists(dirname(__FILE__) . "/dist/static/js/main.js")) {
        $handle .= 'prod';
        wp_enqueue_script( $handle, plugins_url( "/dist/static/js/main.js", __FILE__ ), $dep, '0.1', true );
        wp_enqueue_style( $handle, plugins_url( "/dist/static/css/main.css", __FILE__ ), false, '0.1', 'all' );
      } else {
        $handle .= 'dev';
        wp_enqueue_script( $handle, 'http://localhost:3000/static/js/bundle.js', $dep, '0.1', true );
      }
    }
  }
}

$All_Agent_Card_options = new All_Agent_Card_options();
$All_Agent_Card_options->init();