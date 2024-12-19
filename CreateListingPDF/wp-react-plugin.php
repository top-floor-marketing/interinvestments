<?php
/*
Plugin Name: create_listing_pdf_2
Description: Use the [create_listing_pdf_2] shortcode to display the plugin
Version: 0.0.2
Author: Topfloormarketing
Author URI: https://www.topfloormarketing.net/
*/

class create_listing_pdf_2
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

$create_listing_pdf_2 = new create_listing_pdf_2();
$create_listing_pdf_2->init();

function create_listing_pdf_2_shortcode($atts)
{
  $handle = 'create_listing_pdf_2-wp-react-plugin-';

  // enqueue development or production React code
  if (file_exists(dirname(__FILE__) . "/dist/static/js/main.js")) {
    $handle .= 'prod';
    wp_enqueue_script($handle, plugins_url("/dist/static/js/main.js", __FILE__), ['wp-element'], (string) time(), true);
    wp_enqueue_style($handle, plugins_url("/dist/static/css/main.css", __FILE__), false, (string) time(), 'all');
  } else {
    $handle .= 'dev';
    wp_enqueue_script($handle, 'http://localhost:3000/static/js/bundle.js', ['wp-element'], (string) time(), true);
  }
  return "<div id='create_listing_pdf_2'></div>";
}

add_shortcode('create_listing_pdf_2', 'create_listing_pdf_2_shortcode');
