var $, filepicker, Util, DOM;

(function(Util, DOM, $){
    'use strict';
    
    $('.alert').alert();
    
    $(function(){
        var Alert    = $('.alert')[0],
            Image    = $('#image')[0],
            Width    = $('#width')[0],
            Height   = $('#height')[0],
            $Upload  = $('#upload'),
            $Update  = $('#update'),
            $Remove  = $('#remove'),
            Update   = $Update[0],
            Remove   = $Remove[0],
            FileName = $('.filename')[0],
            $Updating = $('#updating'),
            File, OldWidth, OldHeight,
            URL;
            
            filepicker.setKey('AACq5fTfzRY2E_Rw_4kyaz');
            
            $Upload.click(uploadImage);
            $Update.click(updateImage);
            $Remove.click(removeImage);
            
            $(Image).on('load', function(){
                $(Image).fadeTo('fast', 1);
                hideSpinner();
            });
            
            $(Image).on('error', function(){
                $Updating.removeClass('loading');
            });
        
        function uploadImage(){
            filepicker.pick(function(FPFile){
                console.log(FPFile);
                URL = FPFile.url;
                filepicker.stat(FPFile, {
                    width:true,
                    height: true
                    },function(metadata){
                        File = FPFile;
                        
                        OldWidth     = 
                        Width.value  = 
                        Width.max    = 
                        metadata.width;
                        
                        OldHeight    =
                        Height.value =
                        Height.max   =    
                        metadata.height;
                        
                 });
                
                Update.disabled = 
                Remove.disabled = 
                Height.disabled = 
                Width.disabled = false;
                
                Image.src = URL;
                DOM.show(Image);
                
                FileName.value = FPFile.filename;
                
            });
        }
        
        function updateImage(){
            var lWidth      = Width.value    - 0,
                lHeight     = Height.value   - 0,
                lMaxWidth   = Width.max      - 0,
                lMaxHeight  = Height.max     - 0;

            var lMsg = DOM.getByClass('msg', Alert)[0];
            if(!$.isNumeric(lWidth) || !$.isNumeric(lHeight)){
                lMsg.textContent = 'Height and width could be numbers only.';
                DOM.show( Alert );
                Width.value = OldWidth;
                Height.value = OldHeight;
            }else if(lWidth > lMaxWidth || lHeight > lMaxHeight){
                lMsg.textContent = 'To big size. Max width: ' + lMaxWidth + 'px. Max height: ' + lMaxHeight + 'px.';
                
                DOM.show( Alert );
                Width.value = OldWidth;
                Height.value = OldHeight;
            }
            else if(OldWidth !== lWidth || OldHeight !== lHeight){
                OldWidth  = lWidth;
                OldHeight = lHeight;
                
                $(Image).fadeTo('fast', 0.5);
                Image.src = URL + '/convert' +
                    '?w='+ lWidth + '&h=' + lHeight;
                
                showSpinner();
            }
        }
        
        function removeImage(){
            showSpinner();
            filepicker.remove(File, function(){
                Update.disabled = 
                Remove.disabled = 
                Height.disabled = 
                Width.disabled = true;
                
                OldWidth  = Width.value  = 
                OldHeight = Height.value = '';
                
                FileName.value = '';
                
                DOM.hide(Image);
                hideSpinner();
            });
        }
        
        function showSpinner() {
            $Updating.addClass('loading');
        }
        
        function hideSpinner() {
            $Updating.removeClass('loading');
        }
    });
    
})(Util, DOM, $);
