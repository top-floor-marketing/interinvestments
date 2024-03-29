<?php
/*
Plugin Name: share_agent_plugin
Description: Use the [share_agent_plugin] shortcode to display the plugin
Version: 0.0.1
Author: Topfloormarketing
Author URI: https://www.topfloormarketing.net/
*/

class share_agent_plugin
{

  protected $plugin_options_page = '';

  /**
   * Class constructor
   */
  public function __construct()
  {
    require('plugin_options.php');
  }

  /**
   * Initialize hooks.
   */
  public function init()
  {

    add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_scripts'));
  }

  public function enqueue_frontend_scripts($hook)
  {

    //wp_enqueue_script('react');
    //wp_enqueue_script('react-dom');

    // add react and react-dom from core
    $dep = ''; //['wp-element'];
  }
}

$share_agent_plugin = new share_agent_plugin();
$share_agent_plugin->init();

function share_agent_plugin_shortcode($atts)
{
  $handle = 'share_agent_plugin-wp-react-plugin-';

  // enqueue development or production React code
  if (file_exists(dirname(__FILE__) . "/dist/static/js/main.js")) {
    $handle .= 'prod';
    wp_enqueue_script($handle, plugins_url("/dist/static/js/main.js", __FILE__), ['wp-element'], '0.1', true);
    wp_enqueue_style($handle, plugins_url("/dist/static/css/main.css", __FILE__), false, '0.1', 'all');
  } else {
    $handle .= 'dev';
    wp_enqueue_script($handle, 'http://localhost:3000/static/js/bundle.js', ['wp-element'], '0.1', true);
  }
  return "<div id='share_agent_plugin'></div>";
}

add_shortcode('share_agent_plugin', 'share_agent_plugin_shortcode');
