import less from 'gulp-less';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import prefixer from 'gulp-autoprefixer';
import cleanerCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import rename from 'gulp-rename';
import groupCssMediaQueries from 'gulp-group-css-media-queries';


// const isLess = process.argv.includes('--less');
const isSass = process.argv.includes('--sass');



export const styles = () => {

    return app.gulp.src(app.plugins.gulpIf(!isSass, 
                app.path.src.style.less, 
                app.path.src.style.sass), 
                { sourcemaps: app.isDev },
            )
        .pipe(app.plugins.sourcemaps.init())
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "LESS",
                message: "Error: Style mistake"
            })
            ))   
            .pipe(app.plugins.replace(/@img\//g, '../img/'))
            .pipe(app.plugins.gulpIf(app.isBuild, groupCssMediaQueries()))
            .pipe(app.plugins.gulpIf(!isSass, less(), sass()))
            .pipe(app.plugins.gulpIf(app.isBuild, webpcss({
                webClass: ".webp",
                noWebpClass: ".no-webp"
            })))
            .pipe(app.plugins.gulpIf(app.isBuild, prefixer({
                grid: true,
                overrideBrowserList: ["last 3 versions"],
                cascade: true
            })))
            .pipe(app.plugins.gulpIf(app.isBuild, cleanerCss({
                level: 2
            })))
            .pipe(app.plugins.sourcemaps.write())
            .pipe(rename({
                    extname: ".min.css"
                }))
                .pipe(app.gulp.dest(app.path.build.styles))
                .pipe(app.plugins.browserSync.stream());
                
                
                
                
                // // const less = gulpSass(dartLess);
                
                // export const less = () => {
                //     // console.log("****************app.path.build.css = ", app.path.build.css)
                //     return app.gulp.src(app.path.src.less, { sourcemaps: true })
                        
                
                //         .pipe(prefixer({
                
                //         }))
                //         .pipe(app.gulp.dest(app.path.build.css))
                //         .pipe(cleanerCss())
                
                //         .pipe(app.gulp.dest(app.path.build.css))
                //         .pipe(app.plugins.browserSync.stream())
                // }
                
}