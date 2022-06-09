<?php
/*
Plugin Name: CRM_Dashboard
Description: Use the [CRM_Dashboard] shortcode to display the plugin
Version: 0.0.1
Author: Topfloormarketing
Author URI: https://www.topfloormarketing.net/
*/

class CRM_Dashboard
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

$CRM_Dashboard = new CRM_Dashboard();
$CRM_Dashboard->init();

function CRM_Dashboard_shortcode($atts)
{
  $handle = 'crm_dashboard-wp-react-plugin-';

  // enqueue development or production React code
  if (file_exists(dirname(__FILE__) . "/dist/static/js/main.js")) {
    $handle .= 'prod';
    wp_enqueue_script($handle, plugins_url("/dist/static/js/main.js", __FILE__), ['wp-element'], '0.1', true);
    wp_enqueue_style($handle, plugins_url("/dist/static/css/main.css", __FILE__), false, '0.1', 'all');
  } else {
    $handle .= 'dev';
    wp_enqueue_script($handle, 'http://localhost:3000/static/js/bundle.js', ['wp-element'], '0.1', true);
  }
  return "<div id='CRM_Dashboard'></div>";
}

add_shortcode('CRM_Dashboard', 'CRM_Dashboard_shortcode');
