import del from 'del';
import zipPlugin from 'gulp-zip';


export const zip = () =>{
    del(`./${app.path.rootFolder}.zip`)
    return app.gulp.src(`${app.path.buildFolder}/**/*.*`, { })
    // .pipe(sourcemaps.init())
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "ZIP",
            message: "Error: ZIP mistake"
        })
        )
    ) 
    .pipe(zipPlugin(`${app.path.rootFolder}.zip`))
    .pipe(app.gulp.dest('./'))
}