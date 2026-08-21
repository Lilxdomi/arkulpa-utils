/**
 * Path segments that clearly indicate a scanner.
 * Matches when any segment of the path equals an entry exactly.
 */
const BLOCKED_SEGMENTS = new Set([
  // WordPress core
  'wp-admin',
  'wp-login',
  'wp-login.php',
  'wp-content',
  'wp-includes',
  'wp-json',
  'wp-config',
  'wp-config.php',
  'wp-config.php.bak',
  'wp-cron.php',
  'wp-load.php',
  'wp-signup.php',
  'wp-trackback.php',
  'wp-links-opml.php',
  'wp-mail.php',
  'wp-settings.php',
  'wp-activate.php',
  'wp-blog-header.php',
  'wp-comments-post.php',
  'xmlrpc.php',
  'wlwmanifest.xml',
  'wordpress',

  // Other CMS / admin panels
  'administrator',
  'admin.php',
  'adminer.php',
  'adminer',
  'phpmyadmin',
  'phpMyAdmin',
  'pma',
  'myadmin',
  'mysqladmin',
  'typo3',
  'joomla',
  'drupal',
  'magento',
  'bitrix',
  'umbraco',
  'sitecore',
  'moodle',
  'webadmin',
  'cpanel',
  'plesk',
  'whm',
  'login.php',
  'signin.php',
  'register.php',

  // Config, secret and repo leaks
  '.env',
  '.env.local',
  '.env.production',
  '.env.backup',
  '.env.save',
  '.env.old',
  '.env.dev',
  '.env.development',
  '.env.example',
  '.git',
  '.gitignore',
  '.gitconfig',
  '.svn',
  '.hg',
  '.bzr',
  '.DS_Store',
  '.aws',
  '.ssh',
  '.npmrc',
  '.htaccess',
  '.htpasswd',
  '.bash_history',
  '.vscode',
  '.idea',
  'config.php',
  'configuration.php',
  'settings.php',
  'database.php',
  'db.php',
  'connect.php',
  'credentials',
  'secrets',
  'id_rsa',
  'docker-compose.yml',
  'docker-compose.yaml',
  'Dockerfile',
  'composer.json',
  'composer.lock',
  'package-lock.json',
  'yarn.lock',
  'phpinfo.php',
  'info.php',
  'test.php',
  'shell.php',
  'cmd.php',
  'eval.php',
  'upload.php',
  'uploads.php',
  'file.php',
  'index.php',
  'alfa.php',
  'wso.php',
  'c99.php',
  'r57.php',

  // Known framework / server endpoints
  'vendor',
  'cgi-bin',
  'server-status',
  'server-info',
  'actuator',
  'solr',
  'jenkins',
  'struts',
  'axis2',
  'jmx-console',
  'telescope',
  'phpunit',
  'elmah.axd',
  'trace.axd',
  'owa',
  'ecp',
  'autodiscover',
  'boaform',
  'hudson',
  'druid',
  'geoserver',
  'nacos',
  'eureka',
]);

/** Path prefixes blocked entirely, including all sub-paths. */
const BLOCKED_PREFIXES = [
  '/.git/',
  '/.svn/',
  '/.aws/',
  '/.ssh/',
  '/.well-known/pki-validation/',
  '/.well-known/acme-challenge/',
  '/vendor/phpunit/',
  '/cgi-bin/',
  '/actuator/',
  '/wp-content/',
  '/wp-includes/',
  '/wp-admin/',
  '/wp-json/',
];

/**
 * File extensions that are never served dynamically. Static assets live under
 * /public and are already excluded by the middleware matcher — anything that
 * reaches this point is a scanner.
 */
const BLOCKED_EXTENSIONS = [
  '.php',
  '.php5',
  '.php7',
  '.phtml',
  '.asp',
  '.aspx',
  '.jsp',
  '.jspa',
  '.cgi',
  '.pl',
  '.sh',
  '.bak',
  '.old',
  '.sql',
  '.sqlite',
  '.db',
  '.log',
  '.ini',
  '.conf',
  '.cfg',
  '.yml',
  '.yaml',
  '.env',
  '.swp',
  '.save',
  '.tar',
  '.tar.gz',
  '.tgz',
  '.zip',
  '.rar',
  '.7z',
  '.gz',
  '.bz2',
  '.exe',
  '.dll',
  '.jar',
  '.war',
  '.git',
  '.svn',
];

/** Patterns indicating path traversal or injection attempts. */
const SUSPICIOUS_PATTERNS: RegExp[] = [
  /\.\.[/\\]/, // path traversal: ../
  /%2e%2e/i, // URL-encoded ..
  /%00/i, // null byte
  /\/etc\/passwd/i,
  /\/proc\/self/i,
  /<script/i,
  /\bunion\s+select\b/i,
  /\$\{jndi:/i, // Log4Shell
];

/**
 * Detects requests from vulnerability scanners (WordPress, PHP, CMS exploits etc.).
 *
 * Intended for a middleware that answers such requests with a 404 before the page
 * renders — without it every bot request triggers the CMS API calls behind the page
 * and burns through the request quota.
 *
 * @param pathname - Request path, e.g. `/de/wp-admin/setup-config.php`.
 * @returns `true` if the request looks like a scanner and should be rejected
 * without rendering. An empty path is never blocked; invalid URL encoding always is.
 *
 * @example
 * if (isBlockedRequest(request.nextUrl.pathname)) {
 *   return new NextResponse(null, {status: 404});
 * }
 */
export const isBlockedRequest = (pathname: string): boolean => {
  if (!pathname) return false;

  // Decode so encoded attacks (%2e%2e) are caught too.
  let decoded = pathname;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return true;
  }

  if (SUSPICIOUS_PATTERNS.some((pattern) => pattern.test(decoded))) return true;

  const lower = decoded.toLowerCase();

  if (BLOCKED_PREFIXES.some((prefix) => lower.startsWith(prefix) || lower.includes(prefix))) return true;

  if (BLOCKED_EXTENSIONS.some((extension) => lower.endsWith(extension))) return true;

  const segments = decoded.split('/').filter(Boolean);

  return segments.some((segment) => BLOCKED_SEGMENTS.has(segment) || BLOCKED_SEGMENTS.has(segment.toLowerCase()));
};
