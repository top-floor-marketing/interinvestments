<?php
/*
Plugin Name: Grid_Developments
Description: Use the [Grid_Developments] shortcode to display the plugin
Version: 0.0.1
Author: Topfloormarketing
Author URI: https://www.topfloormarketing.net/
*/

class Grid_Developments
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

$Grid_Developments = new Grid_Developments();
$Grid_Developments->init();

function Grid_Developments_shortcode($atts)
{
  $handle = 'grid-developments-wp-react-plugin-';

  // enqueue development or production React code
  if (file_exists(dirname(__FILE__) . "/dist/static/js/main.js")) {
    $handle .= 'prod';
    wp_enqueue_script($handle, plugins_url("/dist/static/js/main.js", __FILE__), ['wp-element'], '0.1', true);
    wp_enqueue_style($handle, plugins_url("/dist/static/css/main.css", __FILE__), false, '0.1', 'all');
  } else {
    $handle .= 'dev';
    wp_enqueue_script($handle, 'http://localhost:3000/static/js/bundle.js', ['wp-element'], '0.1', true);
  }
  return "<div id='Grid_Developments'></div>";
}

add_shortcode('Grid_Developments', 'Grid_Developments_shortcode');
