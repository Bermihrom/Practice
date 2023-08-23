import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";
import { copy } from "./gulp/task/__copy.js";
import { reset } from "./gulp/task/reset.js";
import { html } from "./gulp/task/html.js";
import { server } from "./gulp/task/server.js";
import { styles } from "./gulp/task/style.js";
import { js } from "./gulp/task/js.js";
import { images } from "./gulp/task/images.js";
import { otfToTtf, ttfToWoff, fontStyle } from "./gulp/task/fonts.js";
import { svgSprive } from "./gulp/task/svgSprives.js";
import { zip } from "./gulp/task/zip.js";
import { ftp } from "./gulp/task/ftp.js";
import { grid } from "./gulp/task/grid.js"
// import { path } from "path";

global.app = {
    isDev : process.argv.includes('--dev'),
    isBuild: process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins,
}

function watcher(){
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.style, styles);
    gulp.watch(path.watch.js, js);
    gulp.watch('./gulp/config/smartGrid.js', grid);
}


export { svgSprive };

const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);
const mainTask = gulp.parallel(copy, html, styles, js, images);
const dev = gulp.series(reset, mainTask, fonts, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTask);
const deployZIP = gulp.series(reset, mainTask, zip);
const deployFTP = gulp.series(reset, mainTask, ftp);

export { dev };
export { build };
export { deployZIP };
export { deployFTP };
export { grid };


gulp.task('default', dev);
// gulp.task('grid', grid);