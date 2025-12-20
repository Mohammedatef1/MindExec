import { useContext } from "react";
import AppContext from "../AppContext";


const useWorkflow = () => {
  const ctx = useContext(AppContext)
  
  const run = () => {
    ctx.setRunStart(true);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("gau-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("gau-1").data.tool.output = `http://testphp.vulnweb.com/
      http://testphp.vulnweb.com/%0A%0A%D9%87%D8%B0%D8%A7
      http://testphp.vulnweb.com:80/%20/listproducts.php?
      http://testphp.vulnweb.com:80/%20HTTP/1.1
      http://testphp.vulnweb.com/%20I%20want%20to%20start%20testing%20on%20stealing%20cookies%20through%20exploit%20xss%20on%20search%20bar%20at%20testphp%20vulnweb
      http://testphp.vulnweb.com:80/%20ip
      http://testphp.vulnweb.com:80/%20Web%20Server
      http://testphp.vulnweb.com/%25%25/index.php
      http://testphp.vulnweb.com:80/%D9%85%D8%AE%D9%84%D9%87%D8%AF
      http://testphp.vulnweb.com/%E2%80%99
      http://testphp.vulnweb.com:80/&fcbz=1
      http://testphp.vulnweb.com:80/'
      http://testphp.vulnweb.com:80/'1=1'
      http://testphp.vulnweb.com:80/(%E7%94%A8%E7%9A%84%E7%9C%8B%E5%88%B0demo
      http://testphp.vulnweb.com:80/%20ip
      http://testphp.vulnweb.com:80/%20Web%20Server
      http://testphp.vulnweb.com/%25%25/index.php
      http://testphp.vulnweb.com:80/%D9%85%D8%AE%D9%84%D9%87%D8%AF
      http://testphp.vulnweb.com/%E2%80%99
      http://testphp.vulnweb.com:80/&fcbz=1
      http://testphp.vulnweb.com:80/'
      http://testphp.vulnweb.com:80/'1=1'
      http://testphp.vulnweb.com:80/(%E7%94%A8%E7%9A%84%E7%9C%8B%E5%88%B0demo
     `;
      ctx.reactFlowInstance.getNode("gau-1").data.tool.stderr = `No stderr output found.`;
      ctx.reactFlowInstance.getNode("gau-1").data.tool.stdout = `http://testphp.vulnweb.com/
      http://testphp.vulnweb.com:80/AJAX/index.php'
      http://testphp.vulnweb.com:80/AJAX/index.php--user-data-dir
      http://testphp.vulnweb.com:80/AJAX/index.php%3Cxml%3E%3Cnode%20name=%22nodename1%22%3Enodetext1%3C/node%3E%3Cnode%20name=%22nodename2%22%3Enodetext2%3C/node%3E%3C/xml%3E
      http://testphp.vulnweb.com/AJAX/index.phpUser-Agent:
      http://testphp.vulnweb.com:80/AJAX/infoartist.php?
      http://testphp.vulnweb.com/AJAX/infoartist.php?id=1
      http://testphp.vulnweb.com:80/ajax/infoartists.php
      http://testphp.vulnweb.com:80/AJAX/infocateg.php
      http://testphp.vulnweb.com:80/AJAX/infocateg.php%E3%80%91%E5%AD%98%E5%9C%A8sqlinject%E6%97%A0%E8%AF%AF%EF%BC%8C%E8%BF%9B%E8%A1%8C%E7%9B%B8%E5%BA%94%E7%9A%84%E4%BF%AE%E5%A4%8D
      http://testphp.vulnweb.com:80/AJAX/infocateg.php%E3%80%91%E5%B9%B6%E6%8F%90%E4%BA%A4%E3%80%90id=1%E3%80%91%EF%BC%8C%E6%89%80%E4%BB%A5%E6%9E%84%E5%BB%BA%E4%B8%BA
      http://testphp.vulnweb.com:80/AJAX/infocateg.php?id=1
      http://t`;
      ctx.reactFlowInstance.getNode("gau-1").data.tool.duration = "00:00:57";
      ctx.setTest(Math.random());
    }, 60000);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("katana-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("katana-1").data.tool.output = `http://testphp.vulnweb.com/
      http://testphp.vulnweb.com/style.css
      http://testphp.vulnweb.com/categories.php
      http://testphp.vulnweb.com/high
      http://testphp.vulnweb.com/privacy.php
      http://testphp.vulnweb.com/cart.php
      http://testphp.vulnweb.com/hpp/
      http://testphp.vulnweb.com/login.php
      http://testphp.vulnweb.com/AJAX/index.php
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/
      http://testphp.vulnweb.com/disclaimer.php
      http://testphp.vulnweb.com/artists.php
      http://testphp.vulnweb.com/index.php
      http://testphp.vulnweb.com/guestbook.php
      http://testphp.vulnweb.com/AJAX/styles.css
      http://testphp.vulnweb.com/userinfo.php
      http://testphp.vulnweb.com/listproducts.php?cat=4
      http://testphp.vulnweb.com/listproducts.php?cat=3
      http://testphp.vulnweb.com/listproducts.php?cat=2
      http://testphp.vulnweb.com/listproducts.php?cat=1
      http://testphp.vulnweb.com/artists.php?artist=3
      http://testphp.vulnweb.com/artists.php?artist=2
      http://testphp.vulnweb.com/artists.php?artist=1
      http://testphp.vulnweb.com/hpp/?pp=12
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/color-printer/3/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/web-camera-a4tech/2/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/network-attached-storage-dlink/1/
      http://testphp.vulnweb.com/signup.php`;
      ctx.reactFlowInstance.getNode("katana-1").data.tool.stderr = `		projectdiscovery.io
      [INF] Current katana version v1.0.4 (outdated)
      [INF] Started headless crawling for => http://testphp.vulnweb.com/`;
      ctx.reactFlowInstance.getNode("katana-1").data.tool.stdout = `http://testphp.vulnweb.com/
      http://testphp.vulnweb.com/style.css
      http://testphp.vulnweb.com/categories.php
      http://testphp.vulnweb.com/high
      http://testphp.vulnweb.com/privacy.php
      http://testphp.vulnweb.com/cart.php
      http://testphp.vulnweb.com/hpp/
      http://testphp.vulnweb.com/login.php
      http://testphp.vulnweb.com/AJAX/index.php
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/
      http://testphp.vulnweb.com/disclaimer.php
      http://testphp.vulnweb.com/artists.php
      http://testphp.vulnweb.com/index.php
      http://testphp.vulnweb.com/guestbook.php
      http://testphp.vulnweb.com/AJAX/styles.css
      http://testphp.vulnweb.com/userinfo.php
      http://testphp.vulnweb.com/listproducts.php?cat=4
      http://testphp.vulnweb.com/listproducts.php?cat=3
      http://testphp.vulnweb.com/listproducts.php?cat=2
      http://testphp.vulnweb.com/listproducts.php?cat=1
      http://testphp.vulnweb.com/artists.php?artist=3
      http://testphp.vulnweb.com/artists.php?artist=2
      http://testphp.vulnweb.com/artists.php?artist=1
      http://testphp.vulnweb.com/hpp/?pp=12
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/color-printer/3/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/web-camera-a4tech/2/
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/Details/network-attached-storage-dlink/1/
      http://testphp.vulnweb.com/signup.php`;
      ctx.reactFlowInstance.getNode("katana-1").data.tool.duration = "00:00:29";
      ctx.setTest(Math.random());
    }, 32000);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("sort-uniq-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("sort-uniq-1").data.tool.output = `http://testphp.vulnweb.com/
      http://testphp.vulnweb.com/%0A%0A%D9%87%D8%B0%D8%A7
      http://testphp.vulnweb.com/%20I%20want%20to%20start%20testing%20on%20stealing%20cookies%20through%20exploit%20xss%20on%20search%20bar%20at%20testphp%20vulnweb
      http://testphp.vulnweb.com/%25%25/index.php
      http://testphp.vulnweb.com/%E2%80%99
      http://testphp.vulnweb.com/,
      `;
      ctx.reactFlowInstance.getNode("sort-uniq-1").data.tool.stderr = `No stderr output found.`;
      ctx.reactFlowInstance.getNode("sort-uniq-1").data.tool.stdout = `http://testphp.vulnweb.com/
      http://testphp.vulnweb.com/%0A%0A%D9%87%D8%B0%D8%A7
      http://testphp.vulnweb.com/%20I%20want%20to%20start%20testing%20on%20stealing%20cookies%20through%20exploit%20xss%20on%20search%20bar%20at%20testphp%20vulnweb
      http://testphp.vulnweb.com/%25%25/index.php
      http://testphp.vulnweb.com/%E2%80%99
      http://testphp.vulnweb.com/,
      http://testphp.vulnweb.com/.%D0%92
      http://testphp.vulnweb.com/.idea/.name
      http://testphp.vulnweb.com/.idea/art.iml
      http://testphp.vulnweb.com/.well-known/ai-plugin.json
      http://testphp.vulnweb.com/.well-known/assetlinks.json
      http://testphp.vulnweb.com/.well-known/dnt-policy.txt
      http://testphp.vulnweb.com/.well-known/gpc.json
      http://testphp.vulnweb.com/.well-known/trust.txt
    `;
      ctx.reactFlowInstance.getNode("sort-uniq-1").data.tool.duration = "00:00:25";
      ctx.setTest(Math.random());
    }, 1000);

    setTimeout(() => {
      ctx.reactFlowInstance.getNode("urldedupe-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("urldedupe-1").data.tool.output = `http://testphp.vulnweb.com/AJAX/infoartist.php?id=1
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php?id=-
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/details.php?id=-1%20OR%2017-7%3d10
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/rate.php?id=-
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,0,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,1,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,97,NULL,active
      http://testphp.vulnweb.com/artist.php?artist=1
      http://testphp.vulnweb.com/artists.php?%20artist=1-SLEEP(3
      http://testphp.vulnweb.com/artists.php?artist=
      http://testphp.vulnweb.com/artists.php?artist=1&
      http://testphp.vulnweb.com/categories.php/listproducts.php?cat=%27
      http://testphp.vulnweb.com/hpp/?pp='%22--%3E%3C%2fst
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%25
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%3CscRipt%3Ealert(0x107E91)%3C%2fscRipt%3E&pp=12
      http://testphp.vulnweb.com/hpp/params.php?p=
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;iframe
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;script&gt;alert(1)&lt;/script&gt
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;script&gt;alert(1)&lt;/script&gt;
      http://testphp.vulnweb.com/hpp/params.php?p=valid&pp=12
      http://testphp.vulnweb.com/hpp/params.php?p=valid&pp=12&aaaa%2f=
      http://testphp.vulnweb.com/index.php?%25id%25=1&user=2
      http://testphp.vulnweb.com/index.php?id=%252%25&user=1
      http://testphp.vulnweb.com/listproducts.php?-
      http://testphp.vulnweb.com/listproducts.php?artist
      http://testphp.vulnweb.com/listproducts.php?artist=123&amp;asdf=ff&amp;cat=123%22%3E%3Csvg%2Fclass%3D%22dalfox%22onLoad%3Dalert%2845%29%3E
      http://testphp.vulnweb.com/listproducts.php?artist=123&asdf=ff&
      `;
      ctx.reactFlowInstance.getNode("urldedupe-1").data.tool.stderr = `No stderr output found.`;
      ctx.reactFlowInstance.getNode("urldedupe-1").data.tool.stdout = `http://testphp.vulnweb.com/AJAX/infoartist.php?id=1
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php?id=-
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/details.php?id=-1%20OR%2017-7%3d10
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/rate.php?id=-
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,0,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,1,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,97,NULL,active
      http://testphp.vulnweb.com/artist.php?artist=1
      http://testphp.vulnweb.com/artists.php?%20artist=1-SLEEP(3
      http://testphp.vulnweb.com/artists.php?artist=
      http://testphp.vulnweb.com/artists.php?artist=1&
      http://testphp.vulnweb.com/categories.php/listproducts.php?cat=%27
      http://testphp.vulnweb.com/hpp/?pp='%22--%3E%3C%2fst
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%25
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%3CscRipt%3Ealert(0x107E91)%3C%2fscRipt%3E&pp=12
      http://testphp.vulnweb.com/hpp/params.php?p=
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;iframe
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;script&gt;alert(1)&lt;/script&gt
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;script&gt;alert(1)&lt;/script&gt;
      http://testphp.vulnweb.com/hpp/params.php?p=valid&pp=12
      http://testphp.vulnweb.com/hpp/params.php?p=valid&pp=12&aaaa%2f=
      http://testphp.vulnweb.com/index.php?%25id%25=1&user=2
      http://testphp.vulnweb.com/index.php?id=%252%25&user=1
      http://testphp.vulnweb.com/listproducts.php?-
      http://testphp.vulnweb.com/listproducts.php?artist
      http://testphp.vulnweb.com/listproducts.php?artist=123&amp;asdf=ff&amp;cat=123%22%3E%3Csvg%2Fclass%3D%22dalfox%22onLoad%3Dalert%2845%29%3E
      http://testphp.vulnweb.com/listproducts.php?artist=123&asdf=ff&cat=123%22%3E%3Csvg%2Fclass%3D%22dalfox%22onLoad%3Dalert%2845%29%3E
      http://testphp.vulnweb.com/listproducts.php?cat=
      http://testphp.vulnweb.com/listproducts.php?cat=123%22%3E%3Cscript%3Ealert(45)%3C/script%3E&zfdfasdf=124fffff
      http://testphp.vulnweb.com/listproducts.php?cat=123%22&
      http://testphp.vulnweb.com/listproducts.php?id=1
      http://testphp.vulnweb.com/login.php?id=1
      http://testphp.vulnweb.com/product.php?pic=1%20OR%2017-
      http://testphp.vulnweb.com/redir.php?r=
      http://testphp.vulnweb.com/redir.php?r=https://www.quangcaoso.net/2020/12/?`;
      ctx.reactFlowInstance.getNode("urldedupe-1").data.tool.duration = "00:00:16";
      ctx.setTest(Math.random());
    }, 88000);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("generate-line-patches-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("generate-line-patches-1").data.tool.output = `1,201`;
      ctx.reactFlowInstance.getNode("generate-line-patches-1").data.tool.stderr = `No stderr output found.`;
      ctx.reactFlowInstance.getNode("generate-line-patches-1").data.tool.stdout = `1,201`;
      ctx.reactFlowInstance.getNode("generate-line-patches-1").data.tool.duration = "00:00:01";
      ctx.setTest(Math.random());
    }, 89000);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("file-spliter-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("file-spliter-1").data.tool.output = `Spliters has no output.`;
      ctx.reactFlowInstance.getNode("file-spliter-1").data.tool.stderr = `Spliters has no stderr.`;
      ctx.reactFlowInstance.getNode("file-spliter-1").data.tool.stdout = `Spliters has no stdout.`;
      ctx.reactFlowInstance.getNode("file-spliter-1").data.tool.duration = "00:00:01";
      ctx.setTest(Math.random());
    }, 90000);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("batch-output-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("batch-output-1").data.tool.output = `http://testphp.vulnweb.com/AJAX/infoartist.php?id=1
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php?id=-
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/details.php?id=-1%20OR%2017-7%3d10
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/rate.php?id=-
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,0,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,1,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,97,NULL,active
      http://testphp.vulnweb.com/artist.php?artist=1
      http://testphp.vulnweb.com/artists.php?%20artist=1-SLEEP(3
      http://testphp.vulnweb.com/artists.php?artist=
      http://testphp.vulnweb.com/artists.php?artist=1&
      http://testphp.vulnweb.com/categories.php/listproducts.php?cat=%27
      http://testphp.vulnweb.com/hpp/?pp='%22--%3E%3C%2fst
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%25
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%3CscRipt%3Ealert(0x107E91)%3C%2fscRipt%3E&pp=12
      http://testphp.vulnweb.com/hpp/params.php?p=
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;iframe
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;script&gt;alert(1)&lt;/script&gt
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;script&gt;alert(1)&lt;/script&gt;
      http://testphp.vulnweb.com/hpp/params.php?p=valid&pp=12
      http://testphp.vulnweb.com/hpp/params.php?p=valid&pp=12&aaaa%2f=
      http://testphp.vulnweb.com:80/product.php?pic=1
      http://testphp.vulnweb.com:80/redir.php?r=http://1tip88.com/m88
      http://testphp.vulnweb.com:80/search.php?test=query
      http://testphp.vulnweb.com:80/secured/phpinfo.php?=PHPB8B5F2A0-3C92-11d3-A3A9-4C7B08C10000`;
      ctx.reactFlowInstance.getNode("batch-output-1").data.tool.stderr = `No stderr output found`;
      ctx.reactFlowInstance.getNode("batch-output-1").data.tool.stdout = `1,201`;
      ctx.reactFlowInstance.getNode("batch-output-1").data.tool.duration = "00:00:01";
      ctx.setTest(Math.random());
    }, 91000);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("nuclei-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("nuclei-1").data.tool.output = `http://testphp.vulnweb.com/AJAX/infoartist.php?id=1f
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php?id=-
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/details.php?id=-1%20OR%2017-7%3d10
      http://testphp.vulnweb.com/Mod_Rewrite_Shop/rate.php?id=-
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,0,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,1,NULL,active
      http://testphp.vulnweb.com/acunetix_file_inclusion_test?,97,NULL,active
      http://testphp.vulnweb.com/artist.php?artist=1
      http://testphp.vulnweb.com/artists.php?%20artist=1-SLEEP(3
      http://testphp.vulnweb.com/artists.php?artist=
      http://testphp.vulnweb.com/artists.php?artist=1&
      http://testphp.vulnweb.com/categories.php/listproducts.php?cat=%27
      http://testphp.vulnweb.com/hpp/?pp='%22--%3E%3C%2fst
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%25
      http://testphp.vulnweb.com/hpp/params.php?aaaa%2f=&p=%3CscRipt%3Ealert(0x107E91)%3C%2fscRipt%3E&pp=12
      http://testphp.vulnweb.com/hpp/params.php?p=
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;iframe
      http://testphp.vulnweb.com/hpp/params.php?p=&lt;script&gt;alert(1)&lt;/script&gt
      `;
      ctx.reactFlowInstance.getNode("nuclei-1").data.tool.stderr = `		projectdiscovery.io
      [INF] nuclei-templates are not installed, installing...
      [INF] Successfully installed nuclei-templates at /root/nuclei-templates
      [INF] Current nuclei version: v3.1.7 (latest)
      [INF] Current nuclei-templates version: v9.7.4 (latest)
      [WRN] Scan results upload to cloud is disabled.
      [INF] New templates added in latest release: 6
      [INF] Templates loaded for current scan: 19
      [WRN] Executing 21 unsigned templates. Use with caution.
      [INF] Targets loaded for current scan: 65
      [INF] Using Interactsh Server: oast.pro
      [0:00:05] | Templates: 19 | Hosts: 65 | RPS: 145 | Matched: 41 | Errors: 18 | Requests: 729/12870 (5%)
      [INF] Skipped testphp.vulnweb.com:80 from target list as found unresponsive 30 times
      [0:00:10] | Templates: 19 | Hosts: 65 | RPS: 134 | Matched: 61 | Errors: 81 | Requests: 1341/12870 (10%)
      [0:00:15] | Templates: 19 | Hosts: 65 | RPS: 89 | Matched: 61 | Errors: 81 | Requests: 1350/12870 (10%)
      [0:00:17] | Templates: 19 | Hosts: 65 | RPS: 79 | Matched: 61 | Errors: 81 | Requests: 1350/12870 (10%)`;
      ctx.reactFlowInstance.getNode("nuclei-1").data.tool.stdout = `		projectdiscovery.io
      [INF] nuclei-templates are not installed, installing...
      [INF] Successfully installed nuclei-templates at /root/nuclei-templates
      [INF] Current nuclei version: v3.1.7 (latest)
      [INF] Current nuclei-templates version: v9.7.4 (latest)
      [WRN] Scan results upload to cloud is disabled.
      [INF] New templates added in latest release: 6
      [INF] Templates loaded for current scan: 19
      [WRN] Executing 21 unsigned templates. Use with caution.
      [INF] Targets loaded for current scan: 65
      [INF] Using Interactsh Server: oast.pro
      [0:00:05] | Templates: 19 | Hosts: 65 | RPS: 145 | Matched: 41 | Errors: 18 | Requests: 729/12870 (5%)
      [INF] Skipped testphp.vulnweb.com:80 from target list as found unresponsive 30 times
      [0:00:10] | Templates: 19 | Hosts: 65 | RPS: 134 | Matched: 61 | Errors: 81 | Requests: 1341/12870 (10%)
      [0:00:15] | Templates: 19 | Hosts: 65 | RPS: 89 | Matched: 61 | Errors: 81 | Requests: 1350/12870 (10%)
      [0:00:17] | Templates: 19 | Hosts: 65 | RPS: 79 | Matched: 61 | Errors: 81 | Requests: 1350/12870 (10%)`;
      ctx.reactFlowInstance.getNode("nuclei-1").data.tool.duration = "00:09:01";
      ctx.setTest(Math.random());
    }, 100000);
    setTimeout(() => {
      ctx.reactFlowInstance.getNode("recursively-cat-all-1").data.tool.status = "succeeded";
      ctx.reactFlowInstance.getNode("recursively-cat-all-1").data.tool.output = `[reflected-xss] [http] [medium] http://testphp.vulnweb.com/listproducts.php?artist='"><43973
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/listproducts.php?artist=' ["SQL syntax; check the manual that corresponds to your MySQL","Warning: mysql_","check the manual that corresponds to your MySQL server version"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php?id=-' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/Mod_Rewrite_Shop/rate.php?id=-' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/AJAX/infoartist.php?id=1' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/Mod_Rewrite_Shop/details.php?id=-1%20OR%2017-7%3d10' ["Warning: mysql_"]
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/listproducts.php?-=' ["Warning: mysql_"]`;
      ctx.reactFlowInstance.getNode("recursively-cat-all-1").data.tool.stderr = `No stderr output found`;
      ctx.reactFlowInstance.getNode("recursively-cat-all-1").data.tool.stdout = `[reflected-xss] [http] [medium] http://testphp.vulnweb.com/listproducts.php?artist='"><43973
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/listproducts.php?artist=' ["SQL syntax; check the manual that corresponds to your MySQL","Warning: mysql_","check the manual that corresponds to your MySQL server version"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/Mod_Rewrite_Shop/buy.php?id=-' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/Mod_Rewrite_Shop/rate.php?id=-' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/AJAX/infoartist.php?id=1' ["Warning: mysql_"]
      [sqli-error-based:mysql] [http] [critical] http://testphp.vulnweb.com/Mod_Rewrite_Shop/details.php?id=-1%20OR%2017-7%3d10' ["Warning: mysql_"]
      [open-redirect] [http] [medium] http://testphp.vulnweb.com/redir.php?r=https://evil.com
      ]`;
      ctx.reactFlowInstance.getNode("recursively-cat-all-1").data.tool.duration = "00:00:05";
      ctx.setTest(Math.random());
      ctx.setRunStart(false);
      ctx.setRunEnd(true);
    }, 105000);
  };

  return {run}
}

export default useWorkflow